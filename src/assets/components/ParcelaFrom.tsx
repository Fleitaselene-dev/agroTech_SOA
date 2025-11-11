import React, { useState, FC, Suspense, lazy } from "react";
import { Loader2, MapPin } from "lucide-react";
import { createParcela } from "@/services/parcela";
import { IParcela } from "@/types/parcela";

// ModalMap se carga de forma lazy para no cargarlo hasta que sea necesario
const MapPickerModal = lazy(() => import("./EstablecimentsMap")

interface ParcelaFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

const ParcelaForm: FC<ParcelaFormProps> = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    superficie: 0,
    ph_suelo: "6.5",
    tipoSuelo: "Arenoso",
    latitud: "",
    longitud: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const handleLocationSelect = (lat: number, lng: number) => {
    setFormData((prev) => ({
      ...prev,
      latitud: lat.toFixed(6),
      longitud: lng.toFixed(6),
    }));
    setIsMapModalOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.latitud || !formData.longitud) {
      setError("Debe seleccionar una ubicación en el mapa.");
      setLoading(false);
      return;
    }

    try {
      const dataToSubmit: IParcela = {
        superficie: Number(formData.superficie),
        ph_suelo: Number(formData.ph_suelo),
        tipoSuelo: formData.tipoSuelo,
        coordenadas: {
          latitud: Number(formData.latitud),
          longitud: Number(formData.longitud),
        },
      };

      await createParcela(dataToSubmit);
      onSuccess();
      onClose();
    } catch (err) {
      setError("Error al crear la Parcela.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
        <form onSubmit={handleSubmit}>
          <h3 className="text-2xl font-bold mb-6 text-[#164a41]">
            Registrar Nueva Parcela
          </h3>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Superficie (ha)</label>
              <input
                type="number"
                name="superficie"
                value={formData.superficie}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div>
              <label>PH del Suelo</label>
              <input
                type="number"
                step="0.1"
                name="ph_suelo"
                value={formData.ph_suelo}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div>
              <label>Latitud</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={formData.latitud}
                  disabled
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setIsMapModalOpen(true)}
                  className="p-2 text-[#507d2a] hover:text-[#406722]"
                >
                  <MapPin size={20} />
                </button>
              </div>
            </div>

            <div>
              <label>Longitud</label>
              <input
                type="text"
                value={formData.longitud}
                disabled
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label>Tipo de Suelo</label>
              <select
                name="tipoSuelo"
                value={formData.tipoSuelo}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              >
                <option value="Arenoso">Arenoso</option>
                <option value="Arcilloso">Arcilloso</option>
                <option value="Limoso">Limoso</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end mt-6 gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border rounded-xl"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading || !formData.latitud}
              className="flex items-center gap-2 bg-[#507d2a] text-white px-6 py-2 rounded-xl"
            >
              {loading && <Loader2 className="animate-spin w-4 h-4" />}
              <span>{loading ? "Creando..." : "Crear Parcela"}</span>
            </button>
          </div>
        </form>
      </div>

      {isMapModalOpen && (
        <Suspense fallback={<div>Cargando mapa...</div>}>
          <MapPickerModal
            isOpen={isMapModalOpen}
            onClose={() => setIsMapModalOpen(false)}
            onLocationSelect={handleLocationSelect}
            initialCoords={{
              latitud: formData.latitud,
              longitud: formData.longitud,
            }}
          />
        </Suspense>
      )}
    </>
  );
};

export default ParcelaForm;
