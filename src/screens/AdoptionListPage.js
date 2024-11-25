import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdoptionListPage.css';

require('dotenv').config();
const REACT_APP_BACKURL = process.env.REACT_APP_BACKURL;

const AdoptionListPage = () => {
    const [animais, setAnimais] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAnimaisAdotados = async () => {
            try {
                const response = await axios.get(`${REACT_APP_BACKURL}/animals/lista-adocao`);
                setAnimais(response.data);
            } catch (err) {
                setError('Erro ao carregar a lista de adoções.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchAnimaisAdotados();
    }, []);

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
        <div className="lista-adocao-container">
            <h1>Animais que Encontraram um Lar com a nossa plataforma</h1>
            <p>Todos os animais merecem um lar cheio de amor e carinho. Nossa plataforma tem sido um elo entre esses bichinhos e 
                famílias dispostas a acolhê-los, facilitando o processo de adoção e garantindo que cada animal encontre um lugar seguro e 
                afetuoso para chamar de lar. Juntos, estamos transformando vidas e espalhando felicidade!</p>
                <br></br>
            {animais.length === 0 ? (
                <p>Ainda não há registros de adoções na plataforma.</p>
            ) : (
                <div className="animais-grid">
                    {animais.map((animal) => (
                        <div key={animal.id} className="animal-card">
                            {animal.imagem && (
                                <img
                                    src={`data:image/jpeg;base64,${animal.imagem}`}
                                    alt={animal.nome}
                                    className="animal-image"
                                />
                            )}
                            <div className="animal-info">
                                <h3>{animal.nome}</h3>
                                <p>Espécie: {animal.especie}</p>
                                <p>Raça: {animal.raca}</p>
                                <p>Idade: {animal.idade} anos</p>
                                <p>{animal.sexo}</p>
                                <p>{animal.descricao}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdoptionListPage;
