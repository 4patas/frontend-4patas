import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AddAnimalPage.css';
import { useNavigate } from 'react-router-dom';
require('dotenv').config();

const REACT_APP_BACKURL = process.env.REACT_APP_BACKURL;

const AddAnimalPage = () => {
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [especie, setEspecie] = useState('');
    const [raca, setRaca] = useState('');
    const [idade, setIdade] = useState('');
    const [sexo, setSexo] = useState('');
    const [porte, setPorte] = useState('');
    const [imagem, setImagem] = useState(null); // Armazena o arquivo da imagem
    const [descricao, setDescricao] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const token = localStorage.getItem('authToken');
        const idUsuario = localStorage.getItem('idUsuario');

        if (!token) {
            setError('Você precisa estar logado para adicionar um animal.');
            setLoading(false);
            return;
        }

        try {
            // Cria o FormData e adiciona os dados
            const formData = new FormData();
            formData.append('nome', nome);
            formData.append('especie', especie);
            formData.append('raca', raca);
            formData.append('idade', idade);
            formData.append('sexo', sexo);
            formData.append('porte', porte);
            formData.append('imagem', imagem); // Adiciona o arquivo de imagem
            formData.append('descricao', descricao);
            formData.append('idUsuario', idUsuario);
            formData.append('dataCriacao', new Date().toISOString().slice(0, 10));

            await axios.post(`${REACT_APP_BACKURL}/animals/add`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data', // Necessário para envio de arquivos
                }
            });

            resetForm();
        } catch (err) {
            setError('Erro ao adicionar o animal. Tente novamente.');
            console.error(err);
        } finally {
            setLoading(false);
            alert('Animal adicionado com sucesso.');
            navigate('/AnimaisDisponiveis');
        }
    };

    const resetForm = () => {
        setNome('');
        setEspecie('');
        setRaca('');
        setIdade('');
        setSexo('');
        setPorte('');
        setImagem(null); // Reseta o campo de imagem
        setDescricao('');
        setError('');
    };

    return (
        <div className="add-animal-container">
            <h1>Adicionar Novo Animal</h1>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="add-animal-form">
                <div className="form-group">
                    <label htmlFor="nome">Nome:</label>
                    <input
                        type="text"
                        id="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="especie">Espécie:</label>
                    <select
                        id="especie"
                        value={especie}
                        onChange={(e) => {
                            setEspecie(e.target.value);
                            setRaca(''); // Reseta a raça ao mudar a espécie
                            setError(''); // Reseta mensagem de erro
                        }}
                        required
                    >
                        <option value="">Selecione uma espécie</option>
                        <option value="cachorro">Cachorro</option>
                        <option value="gato">Gato</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="raca">Raça:</label>
                    <select
                        id="raca"
                        value={raca}
                        onChange={(e) => setRaca(e.target.value)}
                        required
                    >
                        <option value="">Selecione uma raça</option>
                        {/* Raças de cachorros */}
                        {especie === 'cachorro' ? (
                            <>
                                <option value="SRD">SRD (Sem Raça Definida)</option>
                                <option value="Poodle">Poodle</option>
                                <option value="Labrador">Labrador</option>
                                <option value="Bulldog">Bulldog</option>
                                <option value="Beagle">Beagle</option>
                                <option value="Dachshund">Dachshund</option>
                                <option value="Boxer">Boxer</option>
                                <option value="Yorkshire">Yorkshire</option>
                                <option value="Rottweiler">Rottweiler</option>
                                <option value="Pitbull">Pitbull</option>
                                <option value="Schnauzer">Schnauzer</option>
                                <option value="Shih Tzu">Shih Tzu</option>
                                <option value="Cocker Spaniel">Cocker Spaniel</option>
                                <option value="Golden Retriever">Golden Retriever</option>
                                <option value="Doberman">Doberman</option>
                                <option value="Maltês">Maltês</option>
                                <option value="Pug">Pug</option>
                                <option value="Chihuahua">Chihuahua</option>
                                <option value="Husky Siberiano">Husky Siberiano</option>
                                <option value="Fila Brasileiro">Fila Brasileiro</option>
                            </>
                        ) : especie === 'gato' ? (
                            <>
                                <option value="SRD">SRD (Sem Raça Definida)</option>
                                <option value="Persa">Persa</option>
                                <option value="Siamês">Siamês</option>
                                <option value="Maine Coon">Maine Coon</option>
                                <option value="Sphynx">Sphynx</option>
                                <option value="Ragdoll">Ragdoll</option>
                                <option value="Bengal">Bengal</option>
                                <option value="Scottish Fold">Scottish Fold</option>
                                <option value="Himalaia">Himalaia</option>
                                <option value="Britânico de Pelo Curto">Britânico de Pelo Curto</option>
                                <option value="Abissínio">Abissínio</option>
                                <option value="Burmes">Burmes</option>
                            </>
                        ) : (
                            <option value="">Selecione uma espécie primeiro</option>
                        )}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="idade">Idade (anos):</label>
                    <input
                        type="number"
                        step="0.1"
                        id="idade"
                        value={idade}
                        onChange={(e) => setIdade(e.target.value)}
                        required
                        min="0"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="sexo">Sexo:</label>
                    <select
                        id="sexo"
                        value={sexo}
                        onChange={(e) => setSexo(e.target.value)}
                        required
                    >
                        <option value="">Selecione</option>
                        <option value="macho">Macho</option>
                        <option value="fêmea">Fêmea</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="porte">Porte:</label>
                    <select
                        id="porte"
                        value={porte}
                        onChange={(e) => setPorte(e.target.value)}
                        required
                    >
                        <option value="">Selecione</option>
                        <option value="pequeno">Pequeno</option>
                        <option value="médio">Médio</option>
                        <option value="grande">Grande</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="imagem">Imagem:</label>
                    <input type="file" name="imagem" onChange={(e) => setImagem(e.target.files[0])} />

                </div>

                <div className="form-group">
                    <label htmlFor="descricao">Descrição:</label>
                    <textarea
                        id="descricao"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        required
                    ></textarea>
                </div>

                <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? 'Adicionando...' : 'Adicionar Animal'}
                </button>
                <a href="/" className="btn-secondary">Voltar para a página inicial</a>
            </form>
        </div>
    );
};

export default AddAnimalPage;
