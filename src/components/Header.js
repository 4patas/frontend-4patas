import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Header.scss';
import logo from '../images/logo.png';
import logo2 from '../images/logo2.png';
require('dotenv').config();

const REACT_APP_BACKURL = process.env.REACT_APP_BACKURL;

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalAnimais: 0,
    };
  }

  componentDidMount() {
    this.fetchTotalAnimais();
  }

  fetchTotalAnimais = async () => {
    try {
      const response = await axios.get(`${REACT_APP_BACKURL}/ads`);
      this.setState({ totalAnimais: response.data.total });
    } catch (error) {
      console.error('Erro ao buscar o total de animais disponíveis:', error);
    }
  };

  render() {
    const { totalAnimais } = this.state;

    return (
      <header className="header">
        <div className="header-content">
          <div className="options">
            <img src={logo} className="logoBanner" alt="logo" />
            <h2>Veja os pets disponíveis</h2>
            <p>
              Utilize agora nossa plataforma para doar ou adotar um pet.
            </p>
            <p>Atualmente, temos <strong>{totalAnimais}</strong> pets <strong>disponíveis</strong> para adoção.</p>
            <div className="botoes">
              <Link className="btn-primary" to="/AnimaisDisponiveis">Adotar um animal</Link>
              <br />
              <Link className="btn-secondary" to="/AdicionarAnimal">Doar um animal</Link>
            </div>
          </div>
          <div className="options">
            <img src={logo2} className="logoBanner" alt="logo" />
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
