import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './screens/Home';
import AnimalDetail from './screens/AnimalDetail';
import LoginPage from './screens/Login';
import AnimaisDisponiveis from './screens/AnimalsList';
import AddAnimalPage from './screens/AddAnimalPage';
import ProtectedRoute from './components/ProtectedRoute';
import UserProfile from './screens/UserProfile';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RegisterUser from './screens/RegisterUser';
import ForgotPassword from './screens/ForgotPassword';
import ResetPassword from './screens/ResetPassword';
import EditAnimalPage from './screens/EditAnimalPage';
import EditPasswordPage from './screens/EditPasswordPage';
import AdoptionListPage from './screens/AdoptionListPage';
import AdminDashboard from './screens/AdminDashboard';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedUserName = localStorage.getItem('userName');

    if (token && storedUserName) {
      setIsLoggedIn(true);
      setUserName(storedUserName);
    }
  }, []);

  const handleLogin = (token, userName) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userName', userName);
    setIsLoggedIn(true);
    setUserName(userName);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('idUsuario');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    setUserName('');
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} userName={userName} onLogout={handleLogout} />
      <div>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/animais/:id" element={<AnimalDetail />} />
          <Route path="/esqueci-minha-senha" element={<ForgotPassword />} />
          <Route path="/redefinir-senha/:token" element={<ResetPassword />} />
          <Route path="/AnimaisDisponiveis" element={<AnimaisDisponiveis />} />
          <Route path="/animais-adotados" element={<AdoptionListPage />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route
            path="/AdicionarAnimal"
            element={
              <ProtectedRoute>
                <AddAnimalPage />
              </ProtectedRoute>
            }
          />
          <Route path="/editar-animal/:id" element={<EditAnimalPage />} />
          <Route path="/perfil" element={<UserProfile />} />
          <Route path="/editar-senha" element={<EditPasswordPage />} />
          <Route path="/cadastre-se" element={<RegisterUser />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
