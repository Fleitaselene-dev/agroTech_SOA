import React, { useState, FC } from "react";
import { Loader2, Save } from "lucide-react";
import { createParcela } from "@/services/parcela";

interface IParcela {
  superficie: number;
  ph_suelo: number;
  coordenadas: {
    latitud: number;
    longitud: number;
  };
  tipoSuelo: string;
}

interface ParcelaTableFormProps {
  onSuccess: () => void;
}

const ParcelaTableForm: FC<ParcelaTableFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState<
    Omit<IParcela, "coordenadas" | "ph_suelo"> & {
      latitud: string;
      longitud: string;
      ph_suelo: string;
    }
  >({
    superficie: 0,
    latitud: "-26.5365",
    longitud: "-58.7657",
    ph_suelo: "6.5",
    tipoSuelo: "Arenoso",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
    setSuccessMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const dataToSubmit: IParcela = {
        superficie: Number(formData.superficie),
        ph_suelo: Number(formData.ph_suelo),
        coordenadas: {
          latitud: Number(formData.latitud),
          longitud: Number(formData.longitud),
        },
        tipoSuelo: formData.tipoSuelo,
      };

      await createParcela(dataToSubmit);
      setSuccessMessage("¡Parcela creada con éxito!");
      onSuccess();
    } catch (err) {
      setError("Error al crear la Parcela. Verifique los datos.");
      console.error("Error en createParcela:", err);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full p-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-[#507d2a] focus:border-[#507d2a]";
  const cellClass = "p-3 border-b border-gray-100";

  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
      <h3 className="text-xl font-bold mb-4 text-[#164a41]">Registro de Parcela</h3>

      {error && (
        <p className="text-sm text-red-600 mb-3 bg-red-50 p-2 rounded-lg">{error}</p>
      )}
      {successMessage && (
        <p className="text-sm text-[#406722] mb-3 bg-green-50 p-2 rounded-lg">
          {successMessage}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <tbody className="bg-white divide-y divide-gray-100 text-[#164a41]">
              {/* Superficie */}
              <tr>
                <td className={`${cellClass} font-semibold w-1/3`}>Superficie (ha)</td>
                <td className={`${cellClass} w-2/3`}>
                  <input
                    type="number"
                    name="superficie"
                    value={formData.superficie}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </td>
              </tr>

              {/* PH Suelo */}
              <tr>
                <td className={`${cellClass} font-semibold`}>PH del Suelo</td>
                <td className={cellClass}>
                  <input
                    type="number"
                    step="0.1"
                    name="ph_suelo"
                    value={formData.ph_suelo}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </td>
              </tr>

              {/* Tipo Suelo */}
              <tr>
                <td className={`${cellClass} font-semibold`}>Tipo de Suelo</td>
                <td className={cellClass}>
                  <select
                    name="tipoSuelo"
                    value={formData.tipoSuelo}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  >
                    <option value="Arenoso">Arenoso</option>
                    <option value="Arcilloso">Arcilloso</option>
                    <option value="Limoso">Limoso</option>
                  </select>
                </td>
              </tr>

              {/* Latitud */}
              <tr>
                <td className={`${cellClass} font-semibold`}>Latitud (GPS)</td>
                <td className={cellClass}>
                  <input
                    type="text"
                    name="latitud"
                    value={formData.latitud}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </td>
              </tr>

              {/* Longitud */}
              <tr className="border-b-0">
                <td className={`${cellClass} font-semibold`}>Longitud (GPS)</td>
                <td className={cellClass}>
                  <input
                    type="text"
                    name="longitud"
                    value={formData.longitud}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Botón Guardar */}
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#507d2a] text-white px-6 py-2 rounded-xl shadow-md hover:bg-[#406722] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 font-semibold"
          >
            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{loading ? "Guardando..." : "Guardar Parcela"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ParcelaTableForm;
