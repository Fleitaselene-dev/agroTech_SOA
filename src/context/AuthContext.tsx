import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
  useContext,
} from "react";

import { authApi } from "../api/auth";
import type { IUser } from "../types/auth";

interface AuthContextType {
  user: IUser | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    // para usar HttpOnly cookies depue
  });

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      // 1. Obtener token
      const { token } = await authApi.login({ email, password });

      // 2. Usar token para obtener datos completos del usuario
      const userData = await authApi.getUser(token);

      // 3. Guardar en memoria
      setUser(userData);
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      await authApi.register(data);
      // Opcional: auto-login tras registro
      // await login(data.email, data.password);
    } catch (err: any) {
      setError(err.message || "Error al registrar");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
        error,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
