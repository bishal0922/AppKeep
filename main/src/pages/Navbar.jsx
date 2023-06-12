import './styles/navbar.css'
//add image
import logo from '../assets/logo/android-chrome-512x512.png'
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>

        <div className="AppKeep-title">
          <Link to="/">Appkeep</Link>
        </div>

        <ul>
          <li>
            <Link className="links" to="/Login">Login</Link>
          </li>
        </ul>
      </nav>
    );
}

export default Navbar;