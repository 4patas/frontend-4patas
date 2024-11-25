import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
// import '../styles/EditAnimalPage.css';
require('dotenv').config();
const REACT_APP_BACKURL = process.env.REACT_APP_BACKURL;

const EditAnimalPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [especie, setEspecie] = useState('');
    const [raca, setRaca] = useState('');
    const [idade, setIdade] = useState('');
    const [sexo, setSexo] = useState('');
    const [porte, setPorte] = useState('');
    const [imagem, setImagem] = useState(null); // Armazenar URL ou Base64
    const [descricao, setDescricao] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAnimal = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get(`${REACT_APP_BACKURL}/animals/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const animal = response.data;
                setNome(animal.nome);
                setEspecie(animal.especie);
                setRaca(animal.raca);
                setIdade(animal.idade);
                setSexo(animal.sexo);
                setPorte(animal.porte);
                setDescricao(animal.descricao);
                console.log(animal.imagem);
                if (animal.imagem) {
                    setImagem(`data:image/jpeg;base64,${animal.imagem}`); // substitua 'jpeg' pelo tipo adequado
                }

            } catch (err) {
                setError('Erro ao carregar os dados do animal.');
                console.error(err);
            }
        };
        fetchAnimal();
    }, [id]);

    const handleUpdate = async (event) => {
        event.preventDefault();
        setLoading(true);

        const token = localStorage.getItem('authToken');
        if (!token) {
            setError('Você precisa estar logado para editar um animal.');
            setLoading(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append('nome', nome);
            formData.append('especie', especie);
            formData.append('raca', raca);
            formData.append('idade', idade);
            formData.append('sexo', sexo);
            formData.append('porte', porte);
            formData.append('descricao', descricao);

            // Se a imagem for um arquivo (imagem de tipo 'file'), envie ela como está.
            if (imagem instanceof File) {
                formData.append('imagem', imagem);
            } else if (imagem) {
                // Se for Base64, envie como uma string.
                formData.append('imagem', imagem);
            }

            // Envie o formData com o cabeçalho Authorization
            await axios.put(`${REACT_APP_BACKURL}/animals/animal/${id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });

            alert('Animal atualizado com sucesso!');
            navigate('/'); // Redireciona para a página inicial
        } catch (err) {
            setError('Erro ao atualizar o animal. Tente novamente.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="edit-animal-container">
            <h1>Editar Animal</h1>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleUpdate} className="edit-animal-form">
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
                    <input
                        type="file"
                        name="imagem"
                        onChange={(e) => setImagem(e.target.files[0])}
                    />
                </div>
                {imagem && (
                    <div className="animal-image-preview">
                        <img src={imagem} alt={nome}  style={{ width: '200px', height: 'auto' }} />
                    </div>
                )}

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
                    {loading ? 'Atualizando...' : 'Atualizar Animal'}
                </button>
                <a href="/" className="btn-secondary">Voltar para a página inicial</a>
            </form>
        </div>
    );
};

export default EditAnimalPage;
