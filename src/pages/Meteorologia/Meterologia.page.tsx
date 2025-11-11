import React from "react";
import WeatherWidget from "../../assets/components/WeatherWiget";
import { DashboardParcela } from "../../assets/components/parcela";
import Navbar from '../../assets/components/layout/Navbar';

const Weather: React.FC = () => {
  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: "#f8f9fa" }}>
     < Navbar/>
      <div className="max-w-7xl mt-20 mx-auto">
        <section>
          <div className="mb-8 justify-center flex flex-col items-center mt-4">
            <h1 className="text-5xl font-bold mb-6" style={{ color: "#507d2a" }}>
              Monitoreo Agroclimático
            </h1>
            <p className="text-gray-600">
              Gestiona el ambiente en tus terrenos de forma inteligente
            </p>
          </div>
          <WeatherWidget />
        </section>

        <div className="mt-8">
          <section>
            <div className="mb-8 mt-4">
              <h1 className="text-3xl font-bold mb-2" style={{ color: "#507d2a" }}>
                Gestiona el estado de tus tierras
              </h1>
              <p className="text-gray-600">
                Observa el estado de tus suelos y toma decisiones inteligentes.
              </p>
            </div>
            <DashboardParcela />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Weather;
