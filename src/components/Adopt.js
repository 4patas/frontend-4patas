import React, { Component } from 'react';
import '../styles/Adopt.scss';
import logo from '../images/bg1.png';

class About extends Component {

    render() {
        return (
            <div className="adocao" id="about">
                <div className="grid">
                    <h2>Encontre Seu Pet Ideal na 4 Patas</h2>
                    <p>
                        Adotar pela plataforma 4 Patas é simples e rápido! Acesse, crie seu perfil e explore os diversos animais disponíveis.
                        Com filtros personalizados, encontre o pet ideal, envie sua solicitação e aguarde a aprovação.
                        Nossa equipe está 100% dedicada a ajudar cada amigo de quatro patas a encontrar um lar amoroso.</p>

                </div>
                <div className="grid2">
                    <img src={logo} className="banner" alt="logo" />
                </div>
            </div>
        );
    }
}

export default About;