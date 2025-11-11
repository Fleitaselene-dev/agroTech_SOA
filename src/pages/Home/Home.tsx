import React from "react";
import { MapPin, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import CostosChart from "../../assets/components/Charts/CostoChart";
import ProduccionChart from "../../assets/components/Charts/Productionchart";
import MapComponent from "../../assets/components/EstablecimentsMap";
import GanadoList from "../../assets/components/GanadoList";
import WeatherWidget from "../../assets/components/WeatherWiget";
import Navbar from '../../assets/components/layout/Navbar';
import Footer from "../../assets/components/layout/Footer";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 p-6">
      <Navbar/>
      <div className="max-w-7xl mt-12 mx-auto">
        <div className="mb-10 animate-fade-in">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-12 bg-linear-to-b from-[#507d2a] to-[#6b9d3a] rounded-full"></div>
            <h1 className="text-5xl font-bold bg-linear-to-r from-[#507d2a] to-[#6b9d3a] bg-clip-text text-transparent">
              Panel de Control
            </h1>
          </div>
          <p className="text-gray-600 text-lg ml-4 pl-3">
            Gestiona tu establecimiento agropecuario de forma eficiente
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-3 bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-linear-to-br from-[#507d2a] to-[#6b9d3a] rounded-xl">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#507d2a]">
                Ubicación y Lotes
              </h2>
            </div>
            <div className="rounded-2xl overflow-hidden border-2 border-gray-100">
              <MapComponent />
            </div>
          </div>

          <div className="lg:col-span-1 bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
            <GanadoList />
          </div>
        </div>

        <div className="mb-12 p-12">
          <h2 className="text-3xl font-bold text-[#507d2a] mb-12">
            Métricas de tus Últimas Gestiones
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CostosChart />
            <ProduccionChart />
            <div className="lg:col-span-2 flex justify-center mt-8">
              <Link
                to="/gestion"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#507d2a] text-white rounded-2xl transition-all duration-300 font-semibold text-lg shadow-md hover:shadow-lg hover:scale-105 group"
              >
                Ir al Inventario
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-2">
          <h1 className="font-bold mb-6 text-3xl">
            Mira el pronóstico del clima sin importar tu ubicación
          </h1>
          <WeatherWidget />
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default HomePage;
