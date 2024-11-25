import React, { Component } from "react";
import { Link } from 'react-router-dom'; 
import axios from "axios";
import '../styles/PetList.scss';
require('dotenv').config();
const REACT_APP_BACKURL = process.env.REACT_APP_BACKURL;
// const REACT_APP_FRONTURL = process.env.REACT_APP_FRONTURL;

class PetList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animals: [],      // Armazena a lista de animais
      totalAnimals: 0,  // Total de animais para adoção
      pageNumber: 1     // Página atual (caso queira implementar paginação no futuro)
    };
  }

  componentDidMount() {
    this.fetchAnimals(this.state.pageNumber); // Chama a função quando o componente é montado
  }

  fetchAnimals(pageNumber) {
    // Requisição para a API local que retorna a lista de animais
    axios.get(`${REACT_APP_BACKURL}/animals/`)
      .then(response => {
        // Ordena os animais por id em ordem crescente e pega os últimos 5
        const lastFiveAnimals = response.data
          .sort((a, b) => b.id - a.id) // Ordena em ordem decrescente pelo id
          .slice(0, 5); // Pega os 5 primeiros (últimos adicionados)

        this.setState({
          animals: lastFiveAnimals,           // Armazena a lista dos últimos 5 animais
          totalAnimals: response.data.length // Atualiza o total de animais
        });
      })
      .catch(error => {
        console.error('Erro ao buscar animais:', error);
      });
  }

  successShow(response) {
    console.log('Resposta da API externa:', response.data);
  }
  render() {

    return (
      <section className="client-form" id="contact">
        <div className="newClient-title" >
        </div>
        <h2 className="title"> Animais anunciados recentemente</h2>
        <div className="pet-list">
          <hr />
          {this.state.animals.map(animal => (
            <div className="card" key={animal.id}> {/* Adicionei a chave única */}
              <Link to={`/animais/${animal.id}`}>
                <img src={`data:image/jpeg;base64,${animal.imagem}`} alt="Imagem do Animal" />
                <div className="">
                  <h4><b>{animal.nome}</b></h4>
                    <p>{animal.raca}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div>
        </div>
      </section>
    );
  }
}

export default PetList;
