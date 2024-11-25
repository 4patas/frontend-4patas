import React, { useState } from 'react';
import axios from 'axios';
import '../styles/EditPasswordPage.css'; 
require('dotenv').config();

const REACT_APP_BACKURL = process.env.REACT_APP_BACKURL;

const EditPasswordPage = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePasswordChange = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        if (newPassword !== confirmPassword) {
            setError('A confirmação de senha não coincide com a nova senha.');
            setLoading(false);
            return;
        }

        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.put(
                `${REACT_APP_BACKURL}/users/update-password`, 
                { currentPassword, newPassword }, 
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            setSuccess('Senha atualizada com sucesso!');
        } catch (err) {
            setError('Erro ao atualizar a senha. Verifique a senha atual e tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="edit-password-container">
            <h1>Editar Senha</h1>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <form onSubmit={handlePasswordChange} className="edit-password-form">
                <div className="form-group">
                    <label htmlFor="currentPassword">Senha Atual:</label>
                    <input
                        type="password"
                        id="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="newPassword">Nova Senha:</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirmar Nova Senha:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? 'Atualizando...' : 'Atualizar Senha'}
                </button>
            </form>
        </div>
    );
};

export default EditPasswordPage;
