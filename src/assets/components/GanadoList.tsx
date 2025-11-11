import React, { useState } from "react";
import type  { Ganado } from "../../types/ganato";
import { ganadoData } from "../../types/ganato";
const GanadoList: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleToggleExpand = (id: number) => {
    setExpandedId(id === expandedId ? null : id);
  };

  return (
    <div className="p-4 rounded-lg h-full shadow-xl bg-[#86a66f] border border-[#507d2a]">
      <h3 className="text-xl font-bold mb-4 text-[#164a41]">
        Ganado por Propósito
      </h3>

      <div className="max-h-[70vh] overflow-y-scroll scrollbar-hide">
        {ganadoData.map((ganado: Ganado) => (
          <div
            key={ganado.id}
            className="mb-2 p-3 rounded-md cursor-pointer transition-all duration-300"
            style={{
              backgroundColor: expandedId === ganado.id ? "#e6f0e0" : "#f8f8f8",
              borderLeft: `5px solid ${
                expandedId === ganado.id ? "#507d2a" : "transparent"
              }`,
            }}
            onClick={() => handleToggleExpand(ganado.id)}
          >
            <div className="flex justify-between items-center font-semibold text-[#164a41]">
              <span>{ganado.nombre}</span>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  expandedId === ganado.id
                    ? "bg-[#507d2a] text-white"
                    : "bg-gray-200 text-[#164a41]"
                }`}
              >
                {ganado.proposito}
              </span>
            </div>

            {expandedId === ganado.id && (
              <div className="mt-2 text-sm text-gray-700 space-y-1 border-t border-gray-200 pt-2">
                <p>
                  <strong>Raza:</strong> {ganado.raza}
                </p>
                <p>
                  <strong>Edad:</strong> {ganado.edad} meses
                </p>
                <p>
                  <strong>Última Revisión:</strong> {ganado.ultimaRevision}
                </p>
                <p className="text-xs text-gray-500">
                  **Ubicación:** Lat {ganado.lat.toFixed(4)}, Lng{" "}
                  {ganado.lng.toFixed(4)}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GanadoList;
