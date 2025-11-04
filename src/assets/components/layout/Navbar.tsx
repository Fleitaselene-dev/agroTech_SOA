import  { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "wouter";

import { useAuth } from "../../../hooks/UseAuth";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const {user} = useAuth()
  return (
    <nav className="fixed top-0 left-0 w-full bg-[#DAEEC2] shadow z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center justify-center">         
          <img src="/public/AgroPec.png" alt="AgroPec" height={80} width={100} />
          <h1 className="text-2xl font-bold text-primary">AgroTech</h1>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`md:flex items-center space-x-6 ${isOpen ? 'flex flex-col' : 'hidden'}`}>
          {user ? (
            <>
              <Link to="/home">Home</Link>
              <Link to="/inventario">Gestión</Link>
              <Link to="/meteorologia">Ambiente</Link>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-[#507d2a] text-white px-3 py-2 rounded-xl">Iniciar Sesión</Link>
              <Link to="/register" className="bg-[#507d2a] text-white px-3 py-2 rounded-xl">Registrarse</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
