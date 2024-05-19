/* eslint-disable import/no-extraneous-dependencies */
import { Alert, useContext, useState } from 'react';
import axios from 'axios';
import './ConnectForm.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from 'bcryptjs-react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import UserContext from '../Context/UserContext';

const DEFAULT_FORM_VALUES = {
  name: '',
  password: '',
};

const useConnect = () => {
  const [accountConnectionError, setAccountConnectionError] = useState(null);
  const [accountConnectionSuccess, setAccountConnectionSuccess] =
    useState(null);
  const [accountLoadingError, setAccountLoadingError] = useState(null);
  const [accountProv, setAccountProv] = useState(null);
  const displayConnectionSuccessMessage = () => {
    setAccountConnectionSuccess('Connected successfully');
    setTimeout(() => {
      setAccountConnectionSuccess(null);
    }, 3000);
  };
  console.log(displayConnectionSuccessMessage);
  const connectAccount = (event, formValues, setUser) => {
    event.preventDefault();

    setAccountConnectionError(null);
    if (formValues.name === '' || formValues.password === '') {
      console.error('Missing name, this field is required');
      alert("Veuillez rentrer un nom d'utilisateur et un mot de passe");

      return;
    }

    axios
      .get(`${import.meta.env.VITE_BACKDEND_URL}/users/${formValues.name}`)
      .then((response) => {
        setAccountProv(response.data.account);
      })
      .catch((error) => {
        setAccountLoadingError('An error occured while fetching users.');
        console.error(error);
        alert("Ce compte n'existe pas");

        return;
      });

    bcrypt.compare(formValues.password, accountProv['password']).then((res) => {
      if (res) {
        console.log('le compte existe !!');
        setUser(formValues.name);
        alert('Vous êtes bien connectés');
      } else {
        Alert.alert('Mauvais mot de passe');
      }
    });
  };

  return {
    connectAccount,
    accountConnectionError,
    accountConnectionSuccess,
    accountLoadingError,
  };
};

function ConnectForm() {
  const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES);
  const {
    connectAccount,
    accountConnectionError,
    accountConnectionSuccess,
    accountLoadingError,
  } = useConnect();
  const [showPassword, setShowPassword] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  if (user !== 'Anonyme') {
    return <div>Vous êtes connectés en tant que {user}</div>;
  }

  return (
    <div>
      <form
        className="add-account-form"
        onSubmit={(event) => connectAccount(event, formValues, setUser)}
      >
        <TextField
          className="add-account-input"
          type="name"
          placeholder="Nom"
          value={formValues.name}
          onChange={(event) =>
            setFormValues({ ...formValues, name: event.target.value })
          }
          sx={{
            '& fieldset': { border: 'none' },
          }}
        />
        <div className="BlankName">Br</div>
        <TextField
          type={showPassword ? 'text' : 'password'}
          className="add-account-input"
          placeholder="Mot de passe"
          onChange={(event) =>
            setFormValues({ ...formValues, password: event.target.value })
          }
          spellCheck={false}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  className="the_button"
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            '& fieldset': { border: 'none' },
          }}
        />
        <button className="add-account-button" type="submit">
          Créer le compte
        </button>
      </form>
      {accountConnectionSuccess !== null && (
        <div className="account-creation-success">
          {accountConnectionSuccess}
        </div>
      )}
      {accountConnectionError !== null && (
        <div className="account-creation-error">{accountConnectionError}</div>
      )}
    </div>
  );
}

export default ConnectForm;
