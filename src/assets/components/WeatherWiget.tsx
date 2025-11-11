import  { useEffect, useState } from "react";
import type  { FC } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Cloud, Droplets, Wind, Eye, Gauge } from "lucide-react";

interface WeatherData {
  location: { name: string };
  current: {
    temp_c: number;
    condition: { text: string; icon: string };
    feelslike_c: number;
    humidity: number;
    wind_kph: number;
    vis_km: number;
    pressure_mb: number;
  };
}

const WeatherWidget: FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(
      "https://api.weatherapi.com/v1/current.json?key=235608c5e2fe43b395b150051251610&q=Argentina%20Formosa&aqi=no&lang=es"
    )
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener el clima");
        return res.json();
      })
      .then((data) => setWeather(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center min-h-[300px]">
        <DotLottieReact
          src="https://lottie.host/776ba7d8-634f-4a87-aace-47506cd19bdb/5UtDAtNTIp.lottie"
          loop
          autoplay
          style={{ width: "150px", height: "150px" }}
        />
        <p className="text-gray-600 mt-4">
          Cargando información climática...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="text-center p-6 bg-red-50 rounded-lg border border-red-200">
          <p className="text-red-600 font-medium">⚠️ {error}</p>
        </div>
      </div>
    );

  if (!weather) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center gap-2 mb-4">
        <Cloud className="w-5 h-5" style={{ color: "#507d2a" }} />
        <h2 className="text-xl font-semibold" style={{ color: "#507d2a" }}>
          Clima actual en {weather.location.name}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Info principal */}
        <div className="flex items-center gap-6">
          <div className="bg-linear-to-br from-blue-50 to-blue-100 p-4 rounded-2xl">
            <img
              src={`https:${weather.current.condition.icon}`}
              alt={weather.current.condition.text}
              width={80}
              height={80}
              className="select-none"
            />
          </div>
          <div>
            <p className="text-5xl font-bold" style={{ color: "#507d2a" }}>
              {weather.current.temp_c}°C
            </p>
            <p className="text-gray-600 text-lg mt-1">
              {weather.current.condition.text}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Sensación térmica: {weather.current.feelslike_c}°C
            </p>
          </div>
        </div>

        {/* Detalles */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-600">Humedad</span>
            </div>
            <p className="text-2xl font-semibold text-gray-900">
              {weather.current.humidity}%
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Wind className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Viento</span>
            </div>
            <p className="text-2xl font-semibold text-gray-900">
              {weather.current.wind_kph} km/h
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="w-4 h-4 text-purple-500" />
              <span className="text-sm text-gray-600">Visibilidad</span>
            </div>
            <p className="text-2xl font-semibold text-gray-900">
              {weather.current.vis_km} km
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Gauge className="w-4 h-4 text-orange-500" />
              <span className="text-sm text-gray-600">Presión</span>
            </div>
            <p className="text-2xl font-semibold text-gray-900">
              {weather.current.pressure_mb} mb
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
