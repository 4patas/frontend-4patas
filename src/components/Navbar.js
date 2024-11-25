import React from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/Navbar.css';
import logout from '../images/logout.svg';


const Navbar = ({ isLoggedIn, onLogout, userName }) => {
    return (
        <nav className="navbar">
            <div className="navbar-content">
                <h1 className="logo">4Patas</h1>
                <ul className="nav-links">
                    <li><Link to="/">Página Inicial</Link></li>
                    <li><Link to="/AnimaisDisponiveis">Animais</Link></li>
                    {isLoggedIn ? (
                        <>
                            <li><Link to="/perfil">Perfil</Link></li> {/* Mostra o nome do usuário */}
                            <li>
                                <Link onClick={onLogout} className="logout-button"><img src={logout}/></Link>
                            </li>
                        </>
                    ) : (
                        <li><Link to="/login">Login</Link></li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
