import { IParcela } from "@/types/parcela";

export function PanelSuelo({ suelo }: { suelo: IParcela }) {
  const getEstadoColor = (estado: string | undefined) => {
    switch (estado?.toLowerCase()) {
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
            Parcela {suelo.superficie} ha
          </h3>
          <span
            className={`${getEstadoColor(
              suelo.estadoSuelo
            )} text-white text-xs font-medium px-3 py-1 rounded-full`}
          >
            {suelo.estadoSuelo || "Desconocido"}
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

          {suelo.humedad !== undefined && (
            <div className="py-2">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Humedad</span>
                <span className="text-sm font-medium text-gray-900">{suelo.humedad}%</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${suelo.humedad}%`, backgroundColor: "#507d2a" }}
                />
              </div>
            </div>
          )}
        </div>

        {suelo.descripcion && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700 leading-relaxed">{suelo.descripcion}</p>
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            📍 {suelo.coordenadas.latitud}, {suelo.coordenadas.longitud}
          </p>
        </div>
      </div>
    </div>
  );
}
