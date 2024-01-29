import logo from './resource/320px-logo.png';
import './css/header.css';

function Header(props) {

    return (
        <header>
            <div id="logo-container">
                <img className="logo" src={logo}/>
                <h1>Pokedex</h1>
            </div>
        </header>
    );
}

export default Header;