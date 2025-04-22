import { getAuthToken } from '@/utils/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      navigate('/sign-in');
    }
  }, [navigate]);

  return {
    isAuthenticated: !!getAuthToken()
  };
};