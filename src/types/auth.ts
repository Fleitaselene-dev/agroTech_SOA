export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  msg: string;
  token: string;
}

export type Role = "Ganadero" | "Agricultor" | "Mixto" | "admin";

export interface UserFromApi {
  id: string;
  name: string;
  email: string;
  rol: Role;
}

export interface IUser extends UserFromApi {
  _id: string;
}

// para mostrar nombre legible
export const getRoleLabel = (role: Role): string => {
  const labels: Record<Role, string> = {
    admin: "Administrador",
    Ganadero: "Ganadero",
    Agricultor: "Agricultor",
    Mixto: "Ganadero y Agricultor",
  };
  return labels[role] || role;
};
