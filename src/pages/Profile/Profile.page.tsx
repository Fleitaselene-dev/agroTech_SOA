import React from "react";
import { useAuth } from "../../context/AuthContext";
import { LogOut, User } from "lucide-react";
import { useLocation } from "wouter";
import Navbar from "../../assets/components/layout/Navbar";
import Footer from '../../assets/components/layout/Footer';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    logout();
    setLocation("/login");
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">No hay sesión activa.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#f8f9f4] px-4">
        <Navbar/>
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md text-center">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-[#DAEEC2] p-4 rounded-full mb-4">
            <User size={64} className="text-[#507d2a]" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">
            {user.name || "Usuario"}
          </h2>
          <p className="text-gray-500">{user.email}</p>
        </div>

        <div className="text-left space-y-2 mb-6">
          <div>
            <p className="text-sm text-gray-400">Rol:</p>
            <p className="font-medium text-gray-700">{user.role || "Miembro"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Fecha de registro:</p>
            <p className="font-medium text-gray-700">
              {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 bg-[#507d2a] text-white w-full py-2 rounded-lg hover:bg-[#3e6221] transition"
        >
          <LogOut size={18} /> Cerrar sesión
        </button>
      </div>
      <Footer/>
    </div>
  );
};

export default Profile;
