import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/About.css';
import logo from '../images/after.png';

class About extends Component {

  render() {
    return (
      <div className="about" id="about">
        <div className="introducao">
          <h2>Encontre o animal ideal para você</h2>
          <p>
            A plataforma Quatro Patas facilita sua busca pelo pet ideal, conectando você a abrigos e doadores resposaveis. Com filtros personalizados, você encontra o animal que mais combina com seu estilo de vida, garantindo uma adoção responsável e consciente.
            Faça parte dessa rede e encontre seu companheiro perfeito!</p>
            
          <h3 className='case-sucesso'>Confira os <Link to="/animais-adotados">casos de sucesso</Link> de animais que encontraram um lar através da nossa plataforma!</h3>
            
        </div>
        <div className="introducao2">
          <img src={logo} className="banner" alt="logo" />
        </div>
      </div>
    );
  }
}

export default About;