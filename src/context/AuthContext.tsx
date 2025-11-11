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
  token?: string | null;
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
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isAuthenticated = !!user;

  // Al montar, intentar recuperar token desde storage y obtener datos del usuario
  useEffect(() => {
    const init = async () => {
      const t = localStorage.getItem("token");
      if (t) {
        setLoading(true);
        setToken(t);
        try {
          const userData = await authApi.getUser(t);
          setUser(userData);
        } catch (err: any) {
          setError(err.message || "Error al obtener usuario");
          setUser(null);
          setToken(null);
          localStorage.removeItem("token");
        } finally {
          setLoading(false);
        }
      }
    };
    init();
    // Nota: para HttpOnly cookies, este init no sería necesario porque
    // la cookie la enviaría el navegador automáticamente al backend.
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      // 1. Obtener token
      const { token } = await authApi.login({ email, password });
      console.log(token);

      // Guardar token en memoria y persistente (localStorage)
      setToken(token);
      localStorage.setItem("token", token);

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
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
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
