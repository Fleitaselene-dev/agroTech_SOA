import { useState } from "react";
import { Plus, X } from "lucide-react";


interface VacunacionData {
  nombre: string;
  fecha: string;
  docis: number;
  proxima?: string;
}

interface GanadoFormData {
  marca_de_dueño: string;
  raza: string;
  sexo: "Hembra" | "Macho";
  edad: number;
  vacunaciones: VacunacionData;
  antiparacitario: number;
  vitaminas: string;
  entrada_pastoreo: string;
  salida_pastore: string;
  total_vacas: number;
  proposito: "reproductor" | "matadero" | "cría";
  coordenadas: {
    latitud: number;
    longitud: number;
  };
  isPregnant?: boolean;
  fechaProbableParto?: string;
  inicio_ciclo_celo?: string;
  fin_ciclo_celo?: string;
  total_vacas_vendidas?: number;
}

interface GanadoTableFormProps {
  onSuccess?: () => void;
}

const GanadoTableForm = ({ onSuccess }: GanadoTableFormProps) => {
  const [formData, setFormData] = useState<GanadoFormData>({
    marca_de_dueño: "",
    raza: "",
    sexo: "Hembra",
    edad: 0,
    vacunaciones: {
      nombre: "",
      fecha: "",
      docis: 1,
    },
    antiparacitario: 0,
    vitaminas: "",
    entrada_pastoreo: "",
    salida_pastore: "",
    total_vacas: 0,
    proposito: "reproductor",
    coordenadas: {
      latitud: 0,
      longitud: 0,
    },
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name.startsWith("vacunaciones.")) {
      const fieldName = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        vacunaciones: {
          ...prev.vacunaciones,
          [fieldName]: fieldName === "docis" ? parseInt(value) : value,
        },
      }));
    } else if (name.startsWith("coordenadas.")) {
      const fieldName = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        coordenadas: {
          ...prev.coordenadas,
          [fieldName]: parseFloat(value),
        },
      }));
    } else {
      const numFields = ["edad", "antiparacitario", "total_vacas"];
      setFormData((prev) => ({
        ...prev,
        [name]: numFields.includes(name) ? parseInt(value) : value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:4000/api/ganado/create", {
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
      console.log("✅ Ganado creado:", data);

      // Limpiar formulario
      setFormData({
        marca_de_dueño: "",
        raza: "",
        sexo: "Hembra",
        edad: 0,
        vacunaciones: {
          nombre: "",
          fecha: "",
          docis: 1,
        },
        antiparacitario: 0,
        vitaminas: "",
        entrada_pastoreo: "",
        salida_pastore: "",
        total_vacas: 0,
        proposito: "reproductor",
        coordenadas: {
          latitud: 0,
          longitud: 0,
        },
      });
      setIsOpen(false);

      // Ejecutar callback de éxito
      onSuccess?.();
      return data;
    } catch (error) {
      console.error("❌ Error al crear ganado:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full">
      <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow h-full flex flex-col p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-[#507d2a]">Registrar Ganado</h2>
          <div className="bg-[#DAEEC2] p-3 rounded-full">
            <Plus className="text-[#507d2a]" size={24} />
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-6 grow">Registra ganado con información detallada de vacunaciones, salud y pastoreo.</p>

        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="w-full bg-[#507d2a] hover:bg-[#3f5f21] text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200"
          >
            Registrar Nuevo Ganado
          </button>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 max-h-96 overflow-y-auto">
            {/* Marca de Dueño */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Marca del Dueño</label>
              <input
                type="text"
                name="marca_de_dueño"
                value={formData.marca_de_dueño}
                onChange={handleChange}
                placeholder="Ej: MARCA123"
                required
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#507d2a] focus:outline-none transition-colors"
              />
            </div>

            {/* Raza */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Raza</label>
              <input
                type="text"
                name="raza"
                value={formData.raza}
                onChange={handleChange}
                placeholder="Ej: Angus"
                required
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#507d2a] focus:outline-none transition-colors"
              />
            </div>

            {/* Sexo */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Sexo</label>
              <select
                name="sexo"
                value={formData.sexo}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#507d2a] focus:outline-none transition-colors bg-white"
              >
                <option value="Hembra">Hembra</option>
                <option value="Macho">Macho</option>
              </select>
            </div>

            {/* Edad */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Edad (años)</label>
              <input
                type="number"
                name="edad"
                value={formData.edad}
                onChange={handleChange}
                placeholder="Ej: 3"
                required
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#507d2a] focus:outline-none transition-colors"
              />
            </div>

            {/* Vacuna - Nombre */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre de Vacuna</label>
              <input
                type="text"
                name="vacunaciones.nombre"
                value={formData.vacunaciones.nombre}
                onChange={handleChange}
                placeholder="Ej: Aftosa"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#507d2a] focus:outline-none transition-colors"
              />
            </div>

            {/* Vacuna - Fecha */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Fecha Vacuna</label>
              <input
                type="date"
                name="vacunaciones.fecha"
                value={formData.vacunaciones.fecha}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#507d2a] focus:outline-none transition-colors"
              />
            </div>

            {/* Vacuna - Dosis */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Dosis</label>
              <input
                type="number"
                name="vacunaciones.docis"
                value={formData.vacunaciones.docis}
                onChange={handleChange}
                placeholder="Ej: 1"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#507d2a] focus:outline-none transition-colors"
              />
            </div>

            {/* Antiparasitario */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Dosis Antiparasitario</label>
              <input
                type="number"
                name="antiparacitario"
                value={formData.antiparacitario}
                onChange={handleChange}
                placeholder="Ej: 2"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#507d2a] focus:outline-none transition-colors"
              />
            </div>

            {/* Vitaminas */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo de Vitaminas</label>
              <input
                type="text"
                name="vitaminas"
                value={formData.vitaminas}
                onChange={handleChange}
                placeholder="Ej: Complejo B"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#507d2a] focus:outline-none transition-colors"
              />
            </div>

            {/* Entrada Pastoreo */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Entrada Pastoreo</label>
              <input
                type="date"
                name="entrada_pastoreo"
                value={formData.entrada_pastoreo}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#507d2a] focus:outline-none transition-colors"
              />
            </div>

            {/* Salida Pastoreo */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Salida Pastoreo</label>
              <input
                type="date"
                name="salida_pastore"
                value={formData.salida_pastore}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#507d2a] focus:outline-none transition-colors"
              />
            </div>

            {/* Total Vacas */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Total Vacas en Rebaño</label>
              <input
                type="number"
                name="total_vacas"
                value={formData.total_vacas}
                onChange={handleChange}
                placeholder="Ej: 50"
                required
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#507d2a] focus:outline-none transition-colors"
              />
            </div>

            {/* Propósito */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Propósito</label>
              <select
                name="proposito"
                value={formData.proposito}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#507d2a] focus:outline-none transition-colors bg-white"
              >
                <option value="reproductor">Reproductor</option>
                <option value="matadero">Matadero</option>
                <option value="cría">Cría</option>
              </select>
            </div>

            {/* Coordenadas */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Latitud</label>
              <input
                type="number"
                name="coordenadas.latitud"
                value={formData.coordenadas.latitud}
                onChange={handleChange}
                placeholder="Ej: 10.2345"
                step="0.0001"
                required
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#507d2a] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Longitud</label>
              <input
                type="number"
                name="coordenadas.longitud"
                value={formData.coordenadas.longitud}
                onChange={handleChange}
                placeholder="Ej: -75.5432"
                step="0.0001"
                required
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#507d2a] focus:outline-none transition-colors"
              />
            </div>

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
                    marca_de_dueño: "",
                    raza: "",
                    sexo: "Hembra",
                    edad: 0,
                    vacunaciones: {
                      nombre: "",
                      fecha: "",
                      docis: 1,
                    },
                    antiparacitario: 0,
                    vitaminas: "",
                    entrada_pastoreo: "",
                    salida_pastore: "",
                    total_vacas: 0,
                    proposito: "reproductor",
                    coordenadas: {
                      latitud: 0,
                      longitud: 0,
                    },
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

export default GanadoTableForm;
