import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AnimalListPage.css';
import { Link } from 'react-router-dom';

require('dotenv').config();
const REACT_APP_BACKURL = process.env.REACT_APP_BACKURL;

const AnimalListPage = () => {
    const [animals, setAnimals] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 8;

    useEffect(() => {
        const fetchAnimals = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${REACT_APP_BACKURL}/animals/animal-list`, {
                    params: { page: currentPage, limit: itemsPerPage },
                });
                setAnimals(response.data.animals);
                setTotalPages(response.data.totalPages);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar os animais:', error);
                setLoading(false);
            }
        };
        fetchAnimals();
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div>
            <div className="animal-list-container">
                <h1>Lista de Animais</h1>

                <div className="animal-cards">
                    {animals.map(animal => (
                        <div key={animal.id} className="animal-card">
                            {animal.imagem && <img src={`data:image/jpeg;base64,${animal.imagem}`} alt={animal.nome} className='image' />}
                            <h3>{animal.nome}</h3>
                            <p><strong>Espécie:</strong> {animal.especie}</p>
                            <p><strong>Raça:</strong> {animal.raca}</p>
                            <p><strong>Idade:</strong> {animal.idade} anos</p>
                            <p><strong>Sexo:</strong> {animal.sexo}</p>
                            <p><strong>Porte:</strong> {animal.porte}</p>
                            <Link to={`/animais/${animal.id}`} className="view-button"> Ver Detalhes </Link>
                        </div>
                    ))}
                </div>

                <div className="pagination-container">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        Anterior
                    </button>
                    <span>Página {currentPage} de {totalPages}</span>
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        Próxima
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AnimalListPage;
