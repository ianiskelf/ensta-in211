import './Signin.css';
import ConnectForm from '../../components/ConnectForm/ConnectForm';

function Signin() {
  return (
    <div className="Signin-container">
      <header className="App-header">
        <h1>Se connecter</h1>
        <ConnectForm />
      </header>
    </div>
  );
}

export default Signin;