/* eslint-disable import/no-extraneous-dependencies */
import { Alert, useState } from 'react';
import axios from 'axios';
import './CreateAccountForm.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from 'bcryptjs-react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment, TextField } from '@mui/material';

const DEFAULT_FORM_VALUES = {
  name: '',
  password: '',
};

const useSaveAccount = () => {
  const [accountCreationError, setAccountCreationError] = useState(null);
  const [accountCreationSuccess, setAccountCreationSuccess] = useState(null);
  const displayCreationSuccessMessage = () => {
    setAccountCreationSuccess('New account created successfully');
    setTimeout(() => {
      setAccountCreationSuccess(null);
    }, 3000);
  };
  const saveAccount = (event, formValues, setFormValues) => {
    // This avoid page reload
    event.preventDefault();

    setAccountCreationError(null);
    if (formValues.name === '' || formValues.password === '') {
      console.error('Missing name, this field is required');
      alert("Veuillez rentrer un nom d'utilisateur et un mot de passe");

      return;
    }

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(formValues.password, salt, function (_err, hash) {
        console.log(hash);
        setFormValues({ ...formValues, password: hash });
        const newAccount = {
          name: formValues.name,
          password: hash
        }
        console.log(newAccount)
        axios
          .post(`${import.meta.env.VITE_BACKDEND_URL}/accounts/new`, newAccount)
          .then(() => {
            displayCreationSuccessMessage();
            setFormValues(DEFAULT_FORM_VALUES);
            console.log('success');
            console.log(formValues.password);
          })
          .catch((error) => {
            setAccountCreationError(
              'An error occured while creating new account.',
            );
            console.error(error);
            console.log(formValues.password);
          });
      });
    });
  };

  return { saveAccount, accountCreationError, accountCreationSuccess };
};

function CreateAccountForm() {
  const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES);
  const { saveAccount, accountCreationError, accountCreationSuccess } =
    useSaveAccount();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <form
        className="add-account-form"
        onSubmit={(event) => saveAccount(event, formValues, setFormValues)}
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
      {accountCreationSuccess !== null && (
        <div className="account-creation-success">{accountCreationSuccess}</div>
      )}
      {accountCreationError !== null && (
        <div className="account-creation-error">{accountCreationError}</div>
      )}
    </div>
  );
}

export default CreateAccountForm;
