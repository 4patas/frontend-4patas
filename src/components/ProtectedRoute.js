import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Sua função useAuth

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuth();
  
  if (!isAuthenticated) {
    // Se não estiver autenticado, redireciona para a página de login
    alert('Você precisa estar logado para poder acessar está página.');
    return <Navigate to="/login" />;
  }

  return children; // Se estiver autenticado, renderiza os filhos
};

export default ProtectedRoute;
