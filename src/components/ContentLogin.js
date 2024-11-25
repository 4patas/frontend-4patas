import React, { useState } from 'react';
import '../styles/Login.css';
import '../styles/Inputs.css';
import axios from 'axios';
import loading from '../images/loading.gif';
import logo from '../images/bottlogo.png';
import { Link } from 'react-router-dom';

//////////
function Form() {
  const [campos, setCampos] = useState({
    email: '',
    password: '',
  });

  function handleInputChange(event) {

    campos[event.target.name] = event.target.value;
    setCampos(campos);
    console.log(campos)
  }

  function send() {
    const formData = new FormData();
    Object.keys(campos).forEach(key => formData.append(key, campos[key]));
    axios.post('http://localhost:3030/login',
      formData,
      {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(response => { console.log("Tudo certo ", response.data); })
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    document.getElementById("loading").style.visibility = 'visible';
    document.getElementById("sendMessageButton").disabled = true;
    send(campos);
    setTimeout(() => {

      document.getElementById("loading").style.visibility = 'hidden';
      document.getElementById("sendMessageButton").disabled = false;
      alert("Mensagem enviada");
    }, 3000);


  }
  return (

    <section class="contact-form" id="contact">
      <h2><img src={logo} className="App-logo" width="50%" alt="logo" /></h2>
      <p>Área do Cliente</p>
      <form onSubmit={handleFormSubmit}>
        <div className="form-area-login">
          <input className="input-small" id="name" name="email" type="email" placeholder="E-mail" required="required" onChange={handleInputChange} />
          <br></br>
          <input className="input-small" id="email" name="password" type="password" placeholder="Senha" required="required" onChange={handleInputChange} />
          <br></br>
          <Link class="link-esqueceu-senha" to={'Busca-organica/'}> Esqueceu sua senha? </Link>
        </div>
        <img className="loading" width="100%" height="100%" id="loading" src={loading} alt="logo" />
        <div className="text-center" >
          <button className="btn-submit" id="sendMessageButton" type="submit">Logar</button>
        </div>
      </form >
    </section >
  )
}

export default Form;