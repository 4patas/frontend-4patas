import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; 
import '../styles/LoginPage.css';
require('dotenv').config();
const REACT_APP_BACKURL = process.env.REACT_APP_BACKURL;

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${REACT_APP_BACKURL}/users/login`, { email, senha: password });
      const { token, userId, userName } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('idUsuario', userId);
      localStorage.setItem('userName', userName);
      onLogin(token, userName);
      navigate('/AnimaisDisponiveis');
    } catch (err) {
      setError('Email ou senha inválidos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg'>
    <div className="login-container">
      <h2>Entrar no 4Patas</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        <Link to={`/esqueci-minha-senha`}>Esqueci Minha Senha</Link>
        </div>

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
      
      <hr></hr>
      <Link className="register-button" to="/cadastre-se">Cadastrar novo Usuário</Link>
    </div>
    </div>
  );
};

export default LoginPage;
