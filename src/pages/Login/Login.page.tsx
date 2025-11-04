import { Link } from "react-router-dom";

const Login = () => {
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
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-2xl rounded-lg bg-white border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h3 className="text-[#507d2a] text-3xl font-bold">
                    Bienvenido a AgroPec
                  </h3>
                </div>
                <hr className="mt-6 border-b-1 border-gray-200" />
              </div>

              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-gray-500 text-center mb-3 font-bold">
                  <small>Inicia sesión con tus credenciales</small>
                </div>

                <form>
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
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      className="border-0 px-3 py-3 placeholder-gray-400 text-[#164a41] bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring focus:ring-[#507d2a] w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      required
                    />
                  </div>

                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="show-pass-toggle"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-[#507d2a] ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-[#164a41]">
                        Mostrar contraseña
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-[#507d2a] text-white active:bg-[#406722] text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Iniciar Sesión
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <a href="#" className="text-black hover:text-[#7ba257]">
                  <small>¿Olvidaste tu contraseña?</small>
                </a>
              </div>
              <div className="w-1/2 text-right">
                <Link
                  to="/register"
                  className="text-black hover:text-[#7ba257]"
                >
                  <small>Crear nueva cuenta</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

