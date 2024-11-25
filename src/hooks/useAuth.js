import { useEffect, useState } from 'react';

export const useAuth = () => {
  const token = localStorage.getItem('authToken');
  const [isAuthenticated, setIsAuthenticated] = useState(token);
  useEffect(() => {
    if (localStorage.getItem('token') != null) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return isAuthenticated;
};
