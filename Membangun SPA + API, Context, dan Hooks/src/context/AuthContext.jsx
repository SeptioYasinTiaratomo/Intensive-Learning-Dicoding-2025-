import React, { createContext, useState, useEffect } from 'react';
import { getUserLogged } from '../utils/network-data';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  const login = async ({ accessToken }) => {
    localStorage.setItem('accessToken', accessToken);
    const { error, data } = await getUserLogged();

    if (!error) {
      setAuthedUser(data);
    }
  };

  const logout = () => {
    setAuthedUser(null);
    localStorage.removeItem('accessToken');
  };

  useEffect(() => {
    async function initialize() {
      const token = localStorage.getItem('accessToken');

      if (token) {
        const { error, data } = await getUserLogged();
        if (!error) {
          setAuthedUser(data);
        }
      }

      setInitializing(false);
    }

    initialize();
  }, []);

  return (
    <AuthContext.Provider value={{ authedUser, login, logout, initializing }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
