// src/AdicionarUsuario.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/RegisterUser.css';
// import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
require('dotenv').config();
const REACT_APP_BACKURL = process.env.REACT_APP_BACKURL;

const AdicionarUsuario = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [tipo, setTipo] = useState('adotante');
    const [endereco, setEndereco] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cidade, setCidade] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const novoUsuario = {
            nome,
            email,
            senha,
            tipo,
            endereco,
            telefone,
            cidade,
        };

        try {
            const response = await axios.post(`${REACT_APP_BACKURL}/users/register`, novoUsuario);
            setMessage(response.data.message);
            // Limpar os campos do formulário
            setNome('');
            setEmail('');
            setSenha('');
            setEndereco('');
            setTelefone('');
            setCidade('');
            // window.location.href = '  http://localhost:3000/';
        } catch (error) {
            setMessage('Erro ao adicionar usuário: ' + error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="container">
            <h1>Criar uma nova conta</h1>

            {!message ? (<p>Falta poucos passos até você encontrar seu novo amigo.</p>) : (<p>{message}</p>)}
            <form onSubmit={handleSubmit}>
                <label htmlFor="nome">Nome:</label>
                <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                <label htmlFor="senha">Senha:</label>
                <input type="password" id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />

                <label htmlFor="senha">Confirmar senha:</label>
                <input type="password" id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />

                <label htmlFor="endereco">Endereço:</label>
                <input type="text" id="endereco" value={endereco} onChange={(e) => setEndereco(e.target.value)} required />

                <label htmlFor="telefone">Telefone:</label>
                <input type="text" id="telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />

                <label htmlFor="cidade">Cidade:</label>
                <input type="text" id="cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} required />

                <button type="submit">Adicionar Usuário</button>

                <br></br>
                <br></br>
                <a href="/" className="btn-primary">Voltar para a página inicial</a>
            </form>
            {message && <div className="response-message">{message}</div>}
        </div>
    );
};

export default AdicionarUsuario;
