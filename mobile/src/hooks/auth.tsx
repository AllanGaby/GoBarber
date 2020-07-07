import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
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
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function GetAuthDate() {
      const [token, user] = await AsyncStorage.multiGet([
        '@GoBarber:token',
        '@GoBarber:user',
      ]);
      if (token && user) {
        setData({
          token: token[1],
          user: JSON.parse(user[1]),
        });
      }
    }

    GetAuthDate();
    setLoading(false);
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await GoBarberAPI.post<AuthState>('sessions', {
      email,
      password,
    });
    await AsyncStorage.multiSet([
      ['@GoBarber:token', response.data.token],
      ['@GoBarber:user', JSON.stringify(response.data.user)],
    ]);
    setData(response.data);
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:user']);
    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, loading, signIn, signOut }}>
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
