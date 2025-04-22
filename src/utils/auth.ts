const AUTH_TOKEN_KEY = 'auth_token';
const AUTH_TOKEN_EXPIRATION_KEY = 'auth_token_expiration';

export const setAuthToken = (token: string, expiresIn?: number) => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  
  if (expiresIn) {
    // Converte o timestamp para Date string
    const expirationDate = new Date(expiresIn).toISOString();
    localStorage.setItem(AUTH_TOKEN_EXPIRATION_KEY, expirationDate);
  }
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

export const clearAuthToken = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_TOKEN_EXPIRATION_KEY);
};

export const isTokenExpired = (): boolean => {
  const expiration = localStorage.getItem(AUTH_TOKEN_EXPIRATION_KEY);
  if (!expiration) return true;
  
  return new Date() >= new Date(expiration);
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken() && !isTokenExpired();
};