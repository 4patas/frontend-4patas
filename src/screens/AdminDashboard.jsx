import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminDashboard.css';
import { useNavigate } from 'react-router-dom';

require('dotenv').config();
const REACT_APP_BACKURL = process.env.REACT_APP_BACKURL;

const AdminDashboard = () => {
  const [animais, setAnimais] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [loadingAnimais, setLoadingAnimais] = useState(true);
  const [loadingUsuarios, setLoadingUsuarios] = useState(true);
  const [errorAnimais, setErrorAnimais] = useState('');
  const [errorUsuarios, setErrorUsuarios] = useState('');
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();

  const checkPassword = () => {
    const senha = prompt('Por favor, insira a senha para acessar o Dashboard:');
    if (senha !== '15021996') {
      alert('Senha incorreta! Você será redirecionado para a página inicial.');
      navigate('/'); // Redireciona para a página inicial
    }
  };


  useEffect(() => {
    checkPassword();
    const fetchAnimais = async () => {
      try {
        const response = await axios.get(`${REACT_APP_BACKURL}/animals/`);
        setAnimais(response.data);
      } catch (error) {
        setErrorAnimais('Erro ao carregar os anúncios de animais.');
        console.error(error);
      } finally {
        setLoadingAnimais(false);
      }
    };

    // Fetching usuarios
    const fetchUsuarios = async () => {

      try {
        const response = await axios.get(`${REACT_APP_BACKURL}/users/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUsuarios(response.data);
      } catch (error) {
        setErrorUsuarios('Erro ao carregar os usuários cadastrados.');
        console.error(error);
      } finally {
        setLoadingUsuarios(false);
      }
    };

    fetchAnimais();
    fetchUsuarios();
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Dashboard do Administrador</h1>

      <div className="dashboard-section">
        <h2>Anúncios de Cachorros Cadastrados</h2>
        {loadingAnimais ? (
          <p>Carregando anúncios...</p>
        ) : errorAnimais ? (
          <p className="error-message">{errorAnimais}</p>
        ) : animais.length === 0 ? (
          <p>Nenhum anúncio de cachorro encontrado.</p>
        ) : (
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Idade</th>
                <th>Espécie</th>
                <th>Raça</th>
                <th>Porte</th>
                <th>Sexo</th>
                <th>Descrição</th>
                <th>Data de Cadastro</th>
              </tr>
            </thead>
            <tbody>
              {animais.map((animal) => (
                <tr key={animal.id}>
                  <td>{animal.id}</td>
                  <td>{animal.nome}</td>
                  <td>{animal.idade} anos</td>
                  <td>{animal.especie}</td>
                  <td>{animal.raca || 'SRD'}</td>
                  <td>{animal.porte}</td>
                  <td>{animal.sexo}</td>
                  <td>{animal.descricao}</td>
                  <td>{new Date(animal.dataCriacao).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="dashboard-section">
        <h2>Usuários Cadastrados</h2>
        {loadingUsuarios ? (
          <p>Carregando usuários...</p>
        ) : errorUsuarios ? (
          <p className="error-message">{errorUsuarios}</p>
        ) : usuarios.length === 0 ? (
          <p>Nenhum usuário cadastrado encontrado.</p>
        ) : (
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Data de Cadastro</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.nome}</td>
                  <td>{usuario.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
