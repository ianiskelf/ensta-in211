import './Signup.css';
import CreateAccountForm from '../../components/CreateAccountForm/CreateAccountForm';
import SignupTable from '../../components/UsersTable/UsersTable';

function Signup() {
  return (
    <div className="Signup-container">
      <header className="App-header">
        <h1>Créer un compte </h1>
        <CreateAccountForm />
      </header>
    </div>
  );
}

export default Signup;
