import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="bg-[#164a41] min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4 ">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-2xl rounded-lg bg-white border-0">
              <div className="rounded-t mb-0 px-6 py-6 ">
                <div className="text-center mb-3">
                  <h3 className="text-[#507d2a] text-3xl font-bold ">
                    Bienvenido a AgroPec
                  </h3>
                </div>
                <hr className="mt-6 border-b-1 border-gray-200" />
              </div>

              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-gray-500 text-center mb-3 font-bold">
                  <small>Registrate con tus credenciales</small>
                </div>
                <form>
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-[#164a41] text-xs font-bold mb-2">
                      Nombre
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-gray-400 text-[#164a41] bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring focus:ring-[#507d2a] w-full ease-linear transition-all duration-150"
                      placeholder="Nombre"
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-[#164a41] text-xs font-bold mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-gray-400 text-[#164a41] bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring focus:ring-[#507d2a] w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-[#164a41] text-xs font-bold mb-2">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-gray-400 text-[#164a41] bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring focus:ring-[#507d2a] w-full ease-linear transition-all duration-150"
                      placeholder="Contraseña"
                    />
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-[#507d2a] text-white active:bg-[#406722] text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                    >
                      Crear Cuenta
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2 ">
                <Link to="/login" className="text-black hover:text-[#7ba257]">
                  <small>Ya tienes una cuenta?</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
