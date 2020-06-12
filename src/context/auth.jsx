import React, { createContext, useCallback } from 'react';

export const AuthContext = createContext({
  getState() {},
  login() {},
  logout() {}
});

const AuthProvider = ({ children }) => {
  const getState = useCallback(() => !!localStorage.getItem('auth'), []);
  const login = useCallback(() => localStorage.setItem('auth', true), []);
  const logout = useCallback(() => localStorage.removeItem('auth'), []);

  return (
    <AuthContext.Provider value={{ getState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
