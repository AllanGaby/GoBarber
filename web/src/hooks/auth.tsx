import React, { createContext, useContext, useCallback, useState } from 'react';
import GoBarberAPI from '../services/goBarber.api';

interface AuthState {
  token: string;
  user: object;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');
    if (token && user) {
      return {
        token,
        user: JSON.parse(user),
      };
    }
    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await GoBarberAPI.post<AuthState>('sessions', {
      email,
      password,
    });
    localStorage.setItem('@GoBarber:token', response.data.token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(response.data.user));
    setData(response.data);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');
    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export { AuthProvider, useAuth };
