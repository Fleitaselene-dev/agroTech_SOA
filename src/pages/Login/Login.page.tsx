import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login, loading, error, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  // reditigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  // manejar el submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/home");
    } catch {}
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://i0.wp.com/www.fceco.uner.edu.ar/wp-content/uploads/2021/12/sector-agropecuario-en-Mexico.jpg?fit=1200%2C674&ssl=1')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-word w-full mb-6 shadow-2xl rounded-lg bg-white border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h3 className="text-[#507d2a] text-3xl font-bold">
                    Bienvenido a AgroPec
                  </h3>
                </div>
                <hr className="mt-6 border-b border-gray-200" />
              </div>

              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-gray-500 text-center mb-3 font-bold">
                  <small>Inicia sesión con tus credenciales</small>
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm text-center">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-[#164a41] text-xs font-bold mb-2"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-0 px-3 py-3 placeholder-gray-400 text-[#164a41] bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring focus:ring-[#507d2a] w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      required
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-[#164a41] text-xs font-bold mb-2"
                      htmlFor="password"
                    >
                      Contraseña
                    </label>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-0 px-3 py-3 placeholder-gray-400 text-[#164a41] bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring focus:ring-[#507d2a] w-full ease-linear transition-all duration-150"
                      placeholder="Contraseña"
                      required
                    />
                  </div>

                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showPassword}
                        onChange={(e) => setShowPassword(e.target.checked)}
                        className="form-checkbox border-0 rounded text-[#507d2a] ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-[#164a41]">
                        Mostrar contraseña
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      disabled={loading}
                      type="submit"
                      className={`bg-[#507d2a] text-white active:bg-[#406722] text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full transition ${
                        loading ? "opacity-75 cursor-not-allowed" : ""
                      }`}
                    >
                      {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
                    </button>
                  </div>
                </form>
                <div className="text-center mt-4">
                  <Link
                    to="/register"
                    className="text-black hover:text-[#7ba257]"
                  >
                    <small>¿Aún no tienes cuenta? Registrate</small>
                  </Link>
                </div>
              </div>
            </div>

            {/* <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <a href="#" className="text-[#7ba257] hover:text-[#7ba257]">
                  <small>¿Olvidaste tu contraseña?</small>
                </a>
              </div> 
                <div className="text-center bg-green-100/50 rounded-lg p-2">
                <Link
                  to="/register"
                  className="text-black hover:text-[#7ba257]"
                >
                  <small>¿Aún no tienes cuenta? Registrate</small>
                </Link>
              </div> 
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
