import { useState } from "react";
import { Plus, X } from "lucide-react";


interface CultivoFormData {
  tipo_cultivo: string;
  parcela: string;
  fecha_cultivo: string;
  cultivo_asignado: string;
  costo_semillas: number;
  fecha_estimada_de_cosecha: string;
  fertilizacion_tipo?: string;
  tipo_riego?: string;
  plagas?: string;
  pesticidas?: string;
  pesticida_fecha_aplicacion?: string;
  pesticida_costo_por_aplicacion?: number;
  plagas_o_onfermedades?: string;
}

interface CultivoTableFormProps {
  onSuccess?: () => void;
}

const CultivoTableForm = ({ onSuccess }: CultivoTableFormProps) => {
  const [formData, setFormData] = useState<CultivoFormData>({
    tipo_cultivo: "",
    parcela: "",
    fecha_cultivo: "",
    cultivo_asignado: "",
    costo_semillas: 0,
    fecha_estimada_de_cosecha: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showOptional, setShowOptional] = useState(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "costo_semillas" || name === "pesticida_costo_por_aplicacion" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:4000/api/cultivos/createCultivos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ Cultivo creado:", data);

      // Limpiar formulario
      setFormData({
        tipo_cultivo: "",
        parcela: "",
        fecha_cultivo: "",
        cultivo_asignado: "",
        costo_semillas: 0,
        fecha_estimada_de_cosecha: "",
      });
      setIsOpen(false);
      setShowOptional(false);

      // Ejecutar callback de éxito
      onSuccess?.();
      return data;
    } catch (error) {
      console.error("❌ Error al crear cultivo:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full">
      <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow h-full flex flex-col p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-[#507d2a]">Registrar Cultivo</h2>
          <div className="bg-[#DAEEC2] p-3 rounded-full">
            <Plus className="text-[#507d2a]" size={24} />
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-6 grow">Registra nuevos cultivos con información de plantación, cosecha y gestión de plagas.</p>

        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="w-full bg-[#507d2a] hover:bg-[#3f5f21] text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200"
          >
            Registrar Nuevo Cultivo
          </button>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 max-h-96 overflow-y-auto">
            {/* Tipo de Cultivo */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo de Cultivo</label>
              <input
                type="text"
                name="tipo_cultivo"
                value={formData.tipo_cultivo}
                onChange={handleChange}
                placeholder="Ej: Maíz"
                required
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#507d2a] focus:outline-none transition-colors"
              />
            </div>

            {/* Parcela ID */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">ID Parcela</label>
              <input
                type="text"
                name="parcela"
                value={formData.parcela}
                onChange={handleChange}
                placeholder="Ej: 60d5ec49c1234"
                required
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#507d2a] focus:outline-none transition-colors"
              />
            </div>

            {/* Fecha de Cultivo */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Fecha de Plantación</label>
              <input
                type="date"
                name="fecha_cultivo"
                value={formData.fecha_cultivo}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#507d2a] focus:outline-none transition-colors"
              />
            </div>

            {/* Cultivo Asignado */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre del Ciclo/Asignación</label>
              <input
                type="text"
                name="cultivo_asignado"
                value={formData.cultivo_asignado}
                onChange={handleChange}
                placeholder="Ej: Ciclo 2025"
                required
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#507d2a] focus:outline-none transition-colors"
              />
            </div>

            {/* Costo de Semillas */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Costo de Semillas ($)</label>
              <input
                type="number"
                name="costo_semillas"
                value={formData.costo_semillas}
                onChange={handleChange}
                placeholder="Ej: 500"
                step="0.01"
                required
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#507d2a] focus:outline-none transition-colors"
              />
            </div>

            {/* Fecha Estimada de Cosecha */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Fecha Estimada de Cosecha</label>
              <input
                type="date"
                name="fecha_estimada_de_cosecha"
                value={formData.fecha_estimada_de_cosecha}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#507d2a] focus:outline-none transition-colors"
              />
            </div>

            {/* Checkbox para campos opcionales */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="showOpt"
                checked={showOptional}
                onChange={(e) => setShowOptional(e.target.checked)}
                className="w-4 h-4 cursor-pointer"
              />
              <label htmlFor="showOpt" className="text-sm font-semibold text-gray-700 cursor-pointer">
                Agregar información de plagas y fertilización
              </label>
            </div>

            {/* Campos Opcionales */}
            {showOptional && (
              <>
                {/* Fertilización */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo de Fertilizante</label>
                  <input
                    type="text"
                    name="fertilizacion_tipo"
                    value={formData.fertilizacion_tipo || ""}
                    onChange={handleChange}
                    placeholder="Ej: Nitrógeno"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#507d2a] focus:outline-none transition-colors"
                  />
                </div>

                {/* Tipo de Riego */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo de Riego</label>
                  <input
                    type="text"
                    name="tipo_riego"
                    value={formData.tipo_riego || ""}
                    onChange={handleChange}
                    placeholder="Ej: Goteo"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#507d2a] focus:outline-none transition-colors"
                  />
                </div>

                {/* Plagas Detectadas */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Plagas Detectadas</label>
                  <input
                    type="text"
                    name="plagas"
                    value={formData.plagas || ""}
                    onChange={handleChange}
                    placeholder="Ej: Gusano soldado"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#507d2a] focus:outline-none transition-colors"
                  />
                </div>

                {/* Pesticidas */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Pesticida Usado</label>
                  <input
                    type="text"
                    name="pesticidas"
                    value={formData.pesticidas || ""}
                    onChange={handleChange}
                    placeholder="Ej: Insecticida X"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#507d2a] focus:outline-none transition-colors"
                  />
                </div>

                {/* Fecha Aplicación Pesticida */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Fecha Aplicación Pesticida</label>
                  <input
                    type="date"
                    name="pesticida_fecha_aplicacion"
                    value={formData.pesticida_fecha_aplicacion || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#507d2a] focus:outline-none transition-colors"
                  />
                </div>

                {/* Costo Pesticida */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Costo Pesticida por Aplicación ($)</label>
                  <input
                    type="number"
                    name="pesticida_costo_por_aplicacion"
                    value={formData.pesticida_costo_por_aplicacion || 0}
                    onChange={handleChange}
                    placeholder="Ej: 150"
                    step="0.01"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#507d2a] focus:outline-none transition-colors"
                  />
                </div>

                {/* Enfermedades */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Enfermedades Detectadas</label>
                  <input
                    type="text"
                    name="plagas_o_onfermedades"
                    value={formData.plagas_o_onfermedades || ""}
                    onChange={handleChange}
                    placeholder="Ej: Roya"
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
                  setShowOptional(false);
                  setFormData({
                    tipo_cultivo: "",
                    parcela: "",
                    fecha_cultivo: "",
                    cultivo_asignado: "",
                    costo_semillas: 0,
                    fecha_estimada_de_cosecha: "",
                  });
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

export default CultivoTableForm;
