import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { register, loading, error } = useAuth();
  const [, navigate] = useLocation();

  // manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // manejar el submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("???");

    try {
      await register(formData);
      navigate("/login");
    } catch {
      // ya maneja el contexto}
    }
  };

  return (
    <div className="bg-[#164a41] min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4 ">
            <div className="relative flex flex-col min-w-0 wrap-break-word w-full mb-6 shadow-2xl rounded-lg bg-white border-0">
              <div className="rounded-t mb-0 px-6 py-6 ">
                <div className="text-center mb-3">
                  <h3 className="text-[#507d2a] text-3xl font-bold ">
                    Registrate en AgroPec
                  </h3>
                </div>
                <hr className="mt-6 border-b border-gray-200" />
              </div>

              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                {/* <div className="text-gray-500 text-center mb-3 font-bold">
                  <small>Registrate</small>
                </div> */}
                {error && (
                  <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm text-center">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-[#164a41] text-xs font-bold mb-2">
                      Nombre
                    </label>
                    <input
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className="border-0 px-3 py-3 placeholder-gray-400 text-[#164a41] bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring focus:ring-[#507d2a] w-full ease-linear transition-all duration-150"
                      placeholder="Nombre"
                      required
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-[#164a41] text-xs font-bold mb-2">
                      Email
                    </label>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                      className="border-0 px-3 py-3 placeholder-gray-400 text-[#164a41] bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring focus:ring-[#507d2a] w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      required
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-[#164a41] text-xs font-bold mb-2">
                      Contraseña
                    </label>
                    <input
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="border-0 px-3 py-3 placeholder-gray-400 text-[#164a41] bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring focus:ring-[#507d2a] w-full ease-linear transition-all duration-150"
                      placeholder="Contraseña"
                      required
                    />
                  </div>

                  <div className="text-center mt-6">
                    <button
                      type="submit"
                      disabled={loading}
                      className={`bg-[#507d2a] text-white active:bg-[#406722] text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full transition cursor-pointer ${
                        loading ? "opacity-75 cursor-not-allowed" : ""
                      }`}
                    >
                      {loading ? "Creando cuenta..." : "Crear Cuenta"}
                    </button>
                  </div>
                </form>
                <div className="text-center mt-4">
                  <Link to="/login" className="text-black hover:text-[#7ba257]">
                    <small>Ya tienes una cuenta?</small>
                  </Link>
                </div>
              </div>
            </div>

            {/* <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2 ">
                <Link to="/login" className="text-black hover:text-[#7ba257]">
                  <small>Ya tienes una cuenta?</small>
                </Link>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
