import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/ResetPassword.css';
import { useNavigate } from 'react-router-dom';

require('dotenv').config();
const REACT_APP_BACKURL = process.env.REACT_APP_BACKURL;

const ResetPassword = () => {
    const { token } = useParams();
    const [novaSenha, setNovaSenha] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleResetPassword = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${REACT_APP_BACKURL}/users/redefinir-senha`, { token, novaSenha });
            setMessage(response.data.message);
            setError('');
            navigate('/login');
        } catch (err) {
            setError(err.response.data.message);
            setMessage('');
        }
    };

    return (
        <div className="reset-password-container">
            <h2>Redefinir Senha</h2>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleResetPassword}>
                <input
                    type="password"
                    placeholder="Nova senha"
                    value={novaSenha}
                    onChange={(e) => setNovaSenha(e.target.value)}
                    required
                />
                <button type="submit">Redefinir Senha</button>
            </form>
        </div>
    );
};

export default ResetPassword;
