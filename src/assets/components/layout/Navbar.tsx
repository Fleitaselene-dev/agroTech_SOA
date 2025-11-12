import { useState } from "react";
import { Menu, User, X, LogOut, UserCircle } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useAuth } from "../../../context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    logout(); // limpia el estado y token del contexto
    setShowMenu(false);
    setLocation("/"); // redirige al login
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#DAEEC2] shadow z-50">
      <div className="max-w-6xl mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2">
          <img
            src="/public/AgroPec.png"
            alt="AgroPec"
            height={60}
            width={80}
          />
          <h1 className="text-2xl font-bold text-[#507d2a]">AgroTech</h1>
        </div>

        {/* Botón mobile */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Links */}
        <div
          className={`${
            isOpen ? "flex flex-col" : "hidden md:flex"
          } items-center space-x-6 md:space-x-8`}
        >
          {user ? (
            <>
              <Link to="/home" className="hover:text-[#507d2a] font-medium">
                Home
              </Link>
              <Link to="/inventario" className="hover:text-[#507d2a] font-medium">
                Gestión
              </Link>
              <Link to="/meteorologia" className="hover:text-[#507d2a] font-medium">
                Ambiente
              </Link>

              {/* Menú de usuario */}
              <div className="relative">
                <button
                  className="p-2 rounded-full hover:bg-[#cfe5b2] transition-all duration-200"
                  onClick={() => setShowMenu(!showMenu)}
                >
                  <User className="w-6 h-6 text-[#507d2a]" />
                </button>

                {showMenu && (
                  <ul className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-lg border border-gray-200 text-gray-700 z-50">
                    <li className="px-4 py-2 text-sm text-gray-500 border-b">
                      {user.name || "Usuario"}
                    </li>
                    <li>
                      <Link
                        to="/Perfil"
                        onClick={() => setShowMenu(false)}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-all"
                      >
                        <UserCircle className="w-4 h-4" />
                        Perfil
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-gray-100 rounded-lg transition-all"
                      >
                        <LogOut className="w-4 h-4" />
                        Cerrar sesión
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-[#507d2a] text-white px-3 py-2 rounded-xl hover:bg-[#416923] transition"
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/register"
                className="bg-[#507d2a] text-white px-3 py-2 rounded-xl hover:bg-[#416923] transition"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
