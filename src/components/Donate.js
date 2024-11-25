import React, { Component } from 'react';
import '../styles/Donate.scss';
import logo from '../images/bg2.png';


// https://react.semantic-ui.com/


class About extends Component {

    render() {
        return (
            <div className="doacao" id="about">
                <div className="textArea2">
                    <img src={logo} className="banner2" alt="logo" />
                </div>
                <div className="textArea">
                    <h2>Doe Seu Pet com Segurança na 4 Patas</h2>
                    <p>
                        A plataforma 4 Patas ajuda você a doar seu animalzinho de forma responsável e segura. Ao cadastrar seu pet,
                        você fornece todas as informações necessárias para que ele encontre um novo lar adequado. Através de uma análise cuidadosa dos interessados,
                        garantimos que a adoção seja feita por pessoas comprometidas com o bem-estar do animal, promovendo uma transição tranquila e consciente.</p>

                </div>

            </div>
        );
    }
}

export default About;