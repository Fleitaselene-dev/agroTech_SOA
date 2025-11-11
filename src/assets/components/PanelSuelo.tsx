import type { parcela } from "../../types/parcela";

interface PanelSueloProps {
  suelo: parcela;
}

export function PanelSuelo({ suelo }: PanelSueloProps) {
  const getEstadoColor = (estado: string) => {
    switch (estado.toLowerCase()) {
      case "optimo":
        return "bg-emerald-500";
      case "seco":
        return "bg-amber-500";
      case "encharcado":
        return "bg-sky-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 hover:shadow-md transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#507d2a]">
            Parcela  - {suelo.superficie} 
          </h3>
          <span
            className={`${getEstadoColor(suelo.estadoSuelo)} text-white text-xs font-medium px-2 py-1 rounded-full`}
          >
            {suelo.estadoSuelo}
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">Superficie</span>
            <span className="font-medium text-gray-900">{suelo.superficie} ha</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">pH del suelo</span>
            <span className="font-medium text-gray-900">{suelo.ph_suelo}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">Tipo de suelo</span>
            <span className="font-medium text-gray-900">{suelo.tipoSuelo}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            📍 {suelo.coordenadas.latitud}, {suelo.coordenadas.longitud}
          </p>
        </div>
      </div>
    </div>
  );
}
