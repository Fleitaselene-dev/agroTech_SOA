import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { PanelSuelo } from "./PanelSuelo";
import type  { parcela, ParcelaResponse } from "../../types/parcela";

export const DashboardParcela: React.FC = () => {
  const [parcelas, setParcelas] = useState<parcela[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchParcelas = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("http://localhost:4000/api/parcelas", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
        },
      });

      if (!res.ok) {
        throw new Error("Error al cargar las parcelas");
      }

      const data: ParcelaResponse = await res.json();
      setParcelas(data.result || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      console.error("Error cargando parcelas:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParcelas();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2
            className="w-8 h-8 animate-spin mx-auto mb-4"
            style={{ color: "#507d2a" }}
          />
          <p className="text-gray-600">Cargando parcelas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-6 bg-red-50 rounded-lg border border-red-200">
          <p className="text-red-600 font-medium">⚠️ {error}</p>
          <button
            onClick={fetchParcelas}
            className="mt-4 px-4 py-2 rounded-lg text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: "#507d2a" }}
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (!parcelas.length) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-600 text-lg">📊 No hay parcelas disponibles</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: "#fafafa" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {parcelas.map((parcela) => (
            <PanelSuelo key={parcela._id} suelo={parcela} />
          ))}
        </div>
      </div>
    </div>
  );
};
