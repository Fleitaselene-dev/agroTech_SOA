import { useState } from "react";
import { Plus, X } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

interface ParcelaFormData {
  superficie: number;
  ph_suelo: number;
  tipoSuelo: string;
  estadoSuelo: string;
  coordenadas?: {
    latitud: number;
    longitud: number;
  };
}

interface ParcelaTableFormProps {
  onSuccess?: () => void;
}

const ParcelaTableForm = ({ onSuccess }: ParcelaTableFormProps) => {
  const [formData, setFormData] = useState<ParcelaFormData>({
    superficie: 0,
    ph_suelo: 7,
    tipoSuelo: "",
    estadoSuelo: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [includeCoordinates, setIncludeCoordinates] = useState(false);
  const [latitud, setLatitud] = useState("");
  const [longitud, setLongitud] = useState("");
  const { token } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "superficie" || name === "ph_suelo" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Construir el objeto de envío
      const dataToSend = { ...formData };

      if (includeCoordinates && latitud && longitud) {
        dataToSend.coordenadas = {
          latitud: parseFloat(latitud),
          longitud: parseFloat(longitud),
        };
      }

      const response = await fetch("http://localhost:4000/api/parcelas/createParcela", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ Parcela creada:", data);

      // Limpiar formulario
      setFormData({
        superficie: 0,
        ph_suelo: 7,
        tipoSuelo: "",
        estadoSuelo: "",
      });
      setLatitud("");
      setLongitud("");
      setIncludeCoordinates(false);
      setIsOpen(false);

      // Ejecutar callback de éxito
      onSuccess?.();
      return data;
    } catch (error) {
      console.error("❌ Error al crear parcela:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full">
      {/* Card Principal */}
      <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow h-full flex flex-col p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-[#507d2a]">Registrar Parcela</h2>
          <div className="bg-[#DAEEC2] p-3 rounded-full">
            <Plus className="text-[#507d2a]" size={24} />
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-6 grow">Añade nuevas parcelas a tu inventario. Especifica superficie, pH, tipo y estado del suelo.</p>

        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="w-full bg-[#507d2a] hover:bg-[#3f5f21] text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200"
          >
            Crear Nueva Parcela
          </button>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 max-h-96 overflow-y-auto">
            {/* Superficie (m²) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Superficie (m²)</label>
              <input
                type="number"
                name="superficie"
                value={formData.superficie}
                onChange={handleChange}
                placeholder="Ej: 1000"
                required
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#507d2a] focus:outline-none transition-colors"
              />
            </div>

            {/* pH del Suelo */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">pH del Suelo (0-14)</label>
              <input
                type="number"
                name="ph_suelo"
                value={formData.ph_suelo}
                onChange={handleChange}
                min="0"
                max="14"
                step="0.1"
                placeholder="Ej: 6.5"
                required
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#507d2a] focus:outline-none transition-colors"
              />
            </div>

            {/* Tipo de Suelo */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo de Suelo</label>
              <select
                name="tipoSuelo"
                value={formData.tipoSuelo}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#507d2a] focus:outline-none transition-colors bg-white"
              >
                <option value="">Seleccionar tipo de suelo</option>
                <option value="Franco">Franco</option>
                <option value="Arenoso">Arenoso</option>
                <option value="Arcilloso">Arcilloso</option>
                <option value="Limoso">Limoso</option>
              </select>
            </div>

            {/* Estado del Suelo */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Estado del Suelo</label>
              <select
                name="estadoSuelo"
                value={formData.estadoSuelo}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#507d2a] focus:outline-none transition-colors bg-white"
              >
                <option value="">Seleccionar estado</option>
                <option value="Preparado">Preparado</option>
                <option value="En preparación">En preparación</option>
                <option value="Sin preparar">Sin preparar</option>
                <option value="Degradado">Degradado</option>
              </select>
            </div>

            {/* Checkbox para coordenadas */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="includeCoords"
                checked={includeCoordinates}
                onChange={(e) => setIncludeCoordinates(e.target.checked)}
                className="w-4 h-4 cursor-pointer"
              />
              <label htmlFor="includeCoords" className="text-sm font-semibold text-gray-700 cursor-pointer">
                Incluir coordenadas (opcional)
              </label>
            </div>

            {/* Coordenadas */}
            {includeCoordinates && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Latitud</label>
                  <input
                    type="number"
                    value={latitud}
                    onChange={(e) => setLatitud(e.target.value)}
                    placeholder="Ej: 10.2345"
                    step="0.0001"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#507d2a] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Longitud</label>
                  <input
                    type="number"
                    value={longitud}
                    onChange={(e) => setLongitud(e.target.value)}
                    placeholder="Ej: -75.5432"
                    step="0.0001"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#507d2a] focus:outline-none transition-colors"
                  />
                </div>
              </>
            )}

            {/* Botones de Acción */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-[#507d2a] hover:bg-[#3f5f21] disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-xl transition-colors duration-200"
              >
                {isLoading ? "Guardando..." : "Guardar"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setFormData({
                    superficie: 0,
                    ph_suelo: 7,
                    tipoSuelo: "",
                    estadoSuelo: "",
                  });
                  setLatitud("");
                  setLongitud("");
                  setIncludeCoordinates(false);
                }}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <X size={18} />
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ParcelaTableForm;
