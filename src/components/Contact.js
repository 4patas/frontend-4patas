import React, { Component } from 'react';
import '../styles/Contact.css';

// https://react.semantic-ui.com/


class Values extends Component {

  render() {
    return (
      <section class="contact" id="contacts">
        <div class="container text-center">
          <h2 id="contact-title" class="mx-auto mb-5" > Baixe Meu Currículo Completo</h2>
          <h3 id="contact-description" class="mx-auto mb-5" >Clique no botão abaixo para fazer o download do meu currículo completo e conhecer mais sobre minhas experiências e habilidades.</h3>
          <br></br>
          <a id="contact-button" class="btn btn-primary"
            download="../styles/Contact.css'" target="_blank" rel="noreferrer">Entrar em
        contato</a>
        </div>
      </section>
    );
  }
}

export default Values;