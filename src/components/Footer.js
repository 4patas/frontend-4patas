import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <h3 className='footer-logo'>4Patas</h3>
                <p>© 2024 4Patas. Todos os direitos reservados.</p>
                <div className="social-links">
                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">Facebook</a>
                    <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">Instagram</a>
                    <a href="https://www.Linkedin.com/" target="_blank" rel="noopener noreferrer">Linkedin</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
