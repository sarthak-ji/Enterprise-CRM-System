// filepath: src/context/AuthContext.jsx
// Global authentication state: user, token, login/logout actions.
import { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '@/services/auth/authService.js';
import { tokenStorage } from '@/services/storage/tokenStorage.js';
import { handleApiError } from '@/services/api/errorHandler.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hydrate user on app start if a valid token exists
    const init = async () => {
      if (!tokenStorage.getAccessToken()) return setLoading(false);
      try {
        const { data } = await authService.getCurrentUser();
        setUser(data);
      } catch (err) {
        handleApiError(err, 'Session expired');
        tokenStorage.clear();
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const login = async (credentials) => {
    const { data } = await authService.login(credentials);
    tokenStorage.setAccessToken(data.accessToken);
    tokenStorage.setRefreshToken(data.refreshToken);
    setUser(data.user);
    return data.user;
  };

  const logout = async () => {
    try { await authService.logout(); } finally {
      tokenStorage.clear();
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
