import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ForgotPassword.css';
require('dotenv').config();
const REACT_APP_BACKURL = process.env.REACT_APP_BACKURL;

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleForgotPassword = async (event) => {
        event.preventDefault();
        console.log(email);
        try {
            const response = await axios.post(`${REACT_APP_BACKURL}/users/esqueci-minha-senha`,  { email }  );
            setMessage(response.data.message);
            setError('');
        } catch (err) {
            // Se o erro não for retornado no formato esperado, pode causar um erro aqui
            setError(err.response?.data?.message || 'Ocorreu um erro ao enviar o e-mail');
            setMessage('');
        }
    };

    return (
        <div className="forgot-password-container">
            <h2>Esqueci Minha Senha</h2>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleForgotPassword}>
                <input
                    type="email"
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Enviar Link de Redefinição</button>
            </form>
        </div>
    );
};

export default ForgotPassword;
