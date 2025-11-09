import type {
  LoginRequest,
  RegisterRequest,
  LoginResponse,
  IUser,
  Role,
} from "../types/auth";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

export const authApi = {
  login: async (payload: LoginRequest): Promise<LoginResponse> => {
    const res = await fetch(`${API_BASE_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || "Credenciales incorrectas");
    }

    return res.json(); // { msg, token }
  },

  register: async (payload: RegisterRequest): Promise<{ msg: string }> => {
    const res = await fetch(`${API_BASE_URL}/api/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || "Error al registrar");
    }

    return res.json(); // { msg: "Usuario registrado" }
  },

  // Llamada protegida: requiere token en Authorization
  getUser: async (token: string): Promise<IUser> => {
    const res = await fetch(`${API_BASE_URL}/api/getUser`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("No se pudieron cargar los datos del usuario");
    }

    const { user_data } = await res.json(); // { msg, user_data: { id, name, email, rol } }

    // Mapeamos la respuesta a IUser (con _id y role estandarizado)
    return {
      _id: user_data.id,
      id: user_data.id,
      name: user_data.name,
      email: user_data.email,
      rol: user_data.rol as Role,
    };
  },
};
