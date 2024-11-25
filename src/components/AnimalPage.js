import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/AnimalDetail.css';
import wpp from '../images/wpp.svg';
require('dotenv').config();
const REACT_APP_BACKURL = process.env.REACT_APP_BACKURL;

const AnimalDetail = () => {
    const { id } = useParams(); // Obtém o ID do animal da URL
    const [animal, setAnimal] = useState(null); // Estado para armazenar os detalhes do animal
    const [usuario, setUsuario] = useState(null); // Estado para armazenar os detalhes do usuário
    const [loading, setLoading] = useState(true); // Estado de carregamento
    const [error, setError] = useState(null); // Estado para capturar erros
    const [showUserDetails, setShowUserDetails] = useState(false); // Estado para controlar a visibilidade dos detalhes do usuário
    const isLoggedIn = localStorage.getItem('authToken'); // Verifica se o usuário está logado

    useEffect(() => {
        const fetchAnimalDetails = async () => {
            try {
                const animalResponse = await fetch(`${REACT_APP_BACKURL}/animals/${id}`);
                if (!animalResponse.ok) {
                    throw new Error('Animal não encontrado');
                }
                const animalData = await animalResponse.json();

                // Converte a imagem binária para Base64, caso exista
                if (animalData.imagem) {
                    const base64Image = `data:image/jpeg;base64,${Buffer.from(animalData.imagem.data).toString('base64')}`;
                    animalData.imagem = base64Image;
                }

                setAnimal(animalData); // Atualiza o estado com os detalhes do animal

                // Agora busca o usuário associado ao animal
                const usuarioResponse = await fetch(`${REACT_APP_BACKURL}/users/${animalData.idUsuario}`);
                if (!usuarioResponse.ok) {
                    throw new Error('Usuário não encontrado');
                }
                const usuarioData = await usuarioResponse.json();
                setUsuario(usuarioData);

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAnimalDetails();
    }, [id]);

    // Função para alternar a visibilidade dos detalhes do usuário
    const toggleUserDetails = () => {
        setShowUserDetails((prev) => !prev);
    };

    // Renderiza o componente
    if (loading) return <div className="loading">Carregando...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="animal-detail-container">
            <h1 className="animal-name">{animal.nome}</h1>
            {animal.imagem && <img src={animal.imagem} alt={animal.nome} className="animal-image-details" />}
            <div className="animal-info">
                <p><strong>Idade:</strong> {animal.idade} anos</p>
                <p><strong>Espécie:</strong> {animal.especie}</p>
                <p><strong>Raça:</strong> {animal.raca}</p>
                <p><strong>Descrição:</strong> {animal.descricao}</p>
                <p><strong>Cidade do Usuário:</strong> {usuario ? usuario.cidade : 'Carregando...'}</p>
            </div>

            {/* Botão para mostrar/esconder detalhes do usuário */}
            <button onClick={toggleUserDetails} className="toggle-button" disabled={!isLoggedIn}>
                {!isLoggedIn
                    ? 'Você precisa estar logado.'
                    : (showUserDetails ? 'Ocultar Informações do doador' : 'Ver Informações do doador')
                }
            </button>


            {/* Exibe todos os detalhes do usuário se o estado permitir */}
            {showUserDetails && usuario && (
                <div className="usuario-details">
                    <h2>Informações do doador</h2>
                    <p><strong>Nome:</strong> {usuario.nome}</p>
                    <p><strong>Email:</strong> <a href={`mailto:` + usuario.email}>{usuario.email}</a></p>
                    <p><strong>Telefone:</strong> <a href={`tel:+55` + usuario.telefone}>{usuario.telefone}</a></p>
                    <p><strong>Endereço:</strong> {usuario.endereco}</p>
                    <p><strong>Cidade:</strong> {usuario.cidade}</p>
                    <hr></hr>
                    <a href={`https://api.whatsapp.com/send?phone=55${usuario.telefone}&text=Olá, fiquei interessado em seu pet.`} className="btn-wpp">
                        <img src={wpp} alt="Whatsapp logo" />
                    </a>



                </div>
            )}
            <hr></hr>
            <a href="/" className="btn-primary">Voltar para a página inicial</a>
        </div>
    );
};

export default AnimalDetail;
