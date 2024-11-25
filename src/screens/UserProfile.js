import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/UserProfile.css';
require('dotenv').config();
const REACT_APP_BACKURL = process.env.REACT_APP_BACKURL;

const UserProfile = () => {
    const [userData, setUserData] = useState(null);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [animals, setAnimals] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [showAdoptionPopup, setShowAdoptionPopup] = useState(false);
    const [selectedAnimalId, setSelectedAnimalId] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('authToken');
            const userId = localStorage.getItem('idUsuario');

            try {
                const userResponse = await axios.get(`${REACT_APP_BACKURL}/users/user/perfil`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUserData(userResponse.data);
                setFormData(userResponse.data);

                const animalsResponse = await axios.get(`${REACT_APP_BACKURL}/animals/user/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const animalsWithBase64Images = animalsResponse.data.map(animal => {
                    if (animal.imagem) {
                        animal.imagem = `data:image/jpeg;base64,${animal.imagem}`;
                    }
                    return animal;
                });
                setAnimals(animalsWithBase64Images);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar dados do usuário:', error);
                setError('Falha ao carregar dados do usuário.');
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handlePasswordEdit = () => {
        navigate('/editar-senha');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        const token = localStorage.getItem('authToken');
        const userId = localStorage.getItem('idUsuario'); // Recupera o userId do localStorage
    
        const data = { ...formData, userId }; // Inclui o userId no corpo da requisição
    
        try {
            const response = await axios.put(`${REACT_APP_BACKURL}/users/user/perfil`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUserData(response.data);
            localStorage.setItem('userName', response.data.nome);
            setEditing(false);
            navigate('/perfil');
        } catch (error) {
            console.error('Erro ao atualizar perfil:', error);
            setError('Falha ao atualizar perfil.');
        }
    };

    const handleDeleteAccount = async () => {
        const token = localStorage.getItem('authToken');
        try {
            await axios.delete(`${REACT_APP_BACKURL}/users/delete`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            localStorage.removeItem('authToken');
            localStorage.removeItem('username');
            localStorage.removeItem('token');
            localStorage.removeItem('idUsuario');
            localStorage.removeItem('userName');
            setIsLoggedIn(false);
            setUserName('');
            navigate('/');
        } catch (error) {
            console.error('Erro ao excluir conta:', error);
            setError('Falha ao excluir a conta.');
        }
    };

    const openDeleteAnimalPopup = (animalId) => {
        setSelectedAnimalId(animalId);
        setShowAdoptionPopup(true);
    };

    const handleDeleteOrAdoptAnimal = async (isAdopted) => {
        const token = localStorage.getItem('authToken');

        try {
            if (isAdopted) {
                await axios.post(`${REACT_APP_BACKURL}/animals/adopted`, { idAnimal: selectedAnimalId }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // Recarregar a lista de animais após adoção
                const userId = localStorage.getItem('idUsuario');
                const animalsResponse = await axios.get(`${REACT_APP_BACKURL}/animals/user/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const animalsWithBase64Images = animalsResponse.data.map(animal => {
                    if (animal.imagem) {
                        animal.imagem = `data:image/jpeg;base64,${animal.imagem}`;
                    }
                    return animal;
                });
                setAnimals(animalsWithBase64Images); // Atualizar o estado
            } else {
                await axios.delete(`${REACT_APP_BACKURL}/animals/${selectedAnimalId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // Remover o animal da lista local após exclusão
                setAnimals(animals.filter(animal => animal.id !== selectedAnimalId));
            }
            setShowAdoptionPopup(false);
            setSelectedAnimalId(null);
        } catch (error) {
            console.error('Erro ao processar animal:', error);
            setError('Falha ao processar o animal.');
        }
    };


    const handleEditAnimal = (animal) => {
        navigate(`/editar-animal/${animal.id}`);
    };

    const handleReactivateAd = async (animal) => {
        const token = localStorage.getItem('authToken');

        try {
            await axios.post(`${REACT_APP_BACKURL}/animals/reativar-anuncio`, { idAnimal: animal.id }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Atualize a lista de animais ou faça qualquer outra ação necessária
            setAnimals(animals.map(a => a.id === animal.id ? { ...a, isAdopted: false } : a));
        } catch (error) {
            console.error('Erro ao reativar anúncio:', error);
            setError('Falha ao reativar o anúncio.');
        }
    };


    if (loading) {
        return <div>Carregando dados...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="user-profile-container">
            <h2>Perfil do Usuário</h2>
            {error && <p className="error-message">{error}</p>}

            {!editing ? (
                <div className="profile-details">
                    <p><strong>Nome:</strong> {userData?.nome || 'Nome não disponível'}</p>
                    <p><strong>Email:</strong> {userData?.email || 'Email não disponível'}</p>
                    <p><strong>Cidade:</strong> {userData?.cidade || 'Cidade não disponível'}</p>
                    <p><strong>Telefone:</strong> {userData?.telefone || 'Telefone não disponível'}</p>

                    <button onClick={() => setEditing(true)} className="edit-button">Editar Perfil</button>
                    <button onClick={handlePasswordEdit} className="caution-button">Alterar sua Senha</button>
                    <button onClick={() => setShowDeletePopup(true)} className="delete-button">Excluir Conta</button>
                </div>
            ) : (
                <div className="profile-edit-form">
                    <div className="form-group">
                        <label htmlFor="nome">Nome:</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            value={formData.nome || ''}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email || ''}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="cidade">Cidade:</label>
                        <input
                            type="text"
                            id="cidade"
                            name="cidade"
                            value={formData.cidade || ''}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="telefone">Telefone:</label>
                        <input
                            type="text"
                            id="telefone"
                            name="telefone"
                            value={formData.telefone || ''}
                            onChange={handleChange}
                        />
                    </div>

                    <button onClick={handleSave} className="save-button">Salvar Alterações</button>
                    <button onClick={() => setEditing(false)} className="cancel-button">Cancelar</button>
                </div>
            )}
            {showDeletePopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <p>Tem certeza de que deseja excluir sua conta?</p>
                        <button onClick={handleDeleteAccount} className="confirm-delete-button">Sim</button>
                        <button onClick={() => setShowDeletePopup(false)} className="cancel-delete-button">Não</button>
                    </div>
                </div>
            )}
            {showAdoptionPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <p>O seu animal foi adotado?</p>
                        <button onClick={() => handleDeleteOrAdoptAnimal(true)} className="confirm-button">Sim, animal foi Adotado</button>
                        <button onClick={() => setShowAdoptionPopup(false)} className="cancel-button">Cancelar</button>
                        <hr></hr>
                        <button onClick={() => handleDeleteOrAdoptAnimal(false)} className="confirm-delete-button">Não, apenas desejo excluir</button>
                    </div>
                </div>
            )}

            <h3>Meus Animais</h3>
            {animals.length > 0 ? (
                <ul className="animal-list">
                    {animals.map(animal => (
                        <li key={animal.id} className="animal-item">
                            <img src={animal.imagem} alt={animal.nome} className="animal-image" />
                            <div className="animal-details">
                                <p><strong>Nome:</strong> {animal.nome}</p>
                                <p><strong>Espécie:</strong> {animal.especie}</p>
                                <p><strong>Raça:</strong> {animal.raca}</p>

                                {animal.isAdopted ? (
                                    <div>
                                        <hr></hr>
                                        <span>Parabéns, seu animal consta na nossa base de dados como adoção bem-sucedida.</span>
                                        <button onClick={() => handleReactivateAd(animal)} className="confirm-animal-button">Reativar Anúncio</button>
                                    </div>
                                ) : (
                                    <div>
                                        <button onClick={() => handleEditAnimal(animal)} className="edit-button">Editar</button>
                                        <button onClick={() => openDeleteAnimalPopup(animal.id)} className="delete-animal-button">Excluir</button>
                                    </div>
                                )}

                            </div>
                        </li>
                    ))}
                </ul>

            ) : (
                <p>Nenhum animal cadastrado.</p>
            )}
        </div>
    );
};

export default UserProfile;
