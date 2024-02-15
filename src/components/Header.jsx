import { Link } from "react-router-dom"
import logo from '../assets/LOGO.png'

const Header = () => (
    <header>
        <nav>
            <Link to="/">
                <img src={logo} alt="logo Kasa"></img>
            </Link>
            <div>
                <Link to="/">Accueil</Link>
                <Link to="/about">A propos</Link>
            </div>
        </nav>
    </header>

)

export default Header