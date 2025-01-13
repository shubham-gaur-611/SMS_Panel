import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  email: string;
  // Add other user properties as needed
}

export const useAuth = () => {
  const navigate = useNavigate();

  const getToken = () => localStorage.getItem('token');
  
  const getUser = (): User | null => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  };

  const isAuthenticated = (): boolean => {
    return !!getToken();
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return {
    getToken,
    getUser,
    isAuthenticated,
    logout,
  };
};
