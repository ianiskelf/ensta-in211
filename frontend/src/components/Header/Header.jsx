import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <div className="Header-container">
      <Link className="Link" to="/">
        Home
      </Link>
      <div>|</div>
      <Link className="Link" to="/users">
        Users
      </Link>
      <div>|</div>
      <Link className="Link" to="/signup">
        Signup
      </Link>
      <div>|</div>
      <Link className="Link" to="/signin">
        Signin
      </Link>
      <div>|</div>
      <Link className="Link" to="/add_movies">
        Add Film
      </Link>
    </div>
  );
};

export default Header;