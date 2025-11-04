import{ createContext,  useEffect, useState, type ReactNode } from "react";
export type  IUser = {
  _id?: string; 
  name: string;
  email: string;
  role: "Ganadero" | "Agricultor" | "Mixto" | "admin";
  token: string;
}

interface AuthContextType {
  user: IUser | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const decodeToken = (token: string): IUser | null => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      const decoded = JSON.parse(jsonPayload);

      const role = decoded.role || decoded.rol
      // Verificar si el token ha expirado
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        return null;
      }
    
      return {
        _id: decoded.id || decoded._id,
        name: decoded.name,
        email: decoded.email || "",
        role,
        token: token,
      };
    } catch (error) {
      console.error("Error decodificando token:", error);
      return null;
    }
  };

  // Función para verificar el token almacenado
  useEffect (() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const userData = decodeToken(storedToken);
      if (userData) {
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        // Si el token es inválido o ha expirado, limpiar el storage
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  }, []);

 

  // Función para logear usuario
  const login = (token: string) => {
    const userData = decodeToken(token);
    if (userData) {
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};


