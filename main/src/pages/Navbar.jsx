import './styles/navbar.css'
//add image
import logo from '../assets/logo/android-chrome-512x512.png'

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>
            
            <div className='AppKeep-title'>
                <a href="/">AppKeep</a>
            </div>

            <ul>
                <li><a className="links" href="/about">Login</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;