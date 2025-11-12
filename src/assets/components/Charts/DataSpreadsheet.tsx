import { useEffect, useState } from "react";
import { Table as TableIcon, Download, Loader2 } from "lucide-react";
import { getAllCultivos } from "../../../api/cultivo";
import { getAllGanado } from "../../../api/ganado";
import { getAllParcelas } from "../../../api/parecela";

// Tipos de datos
type TabType = "parcelas" | "ganado" | "cultivos";

interface SpreadsheetData {
  id?: string;
  tipo: string;
  nombre: string;
  fecha: string;
  estado: string;
}

const DataSpreadsheet = () => {
  const [activeTab, setActiveTab] = useState<TabType>("parcelas");
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<Record<TabType, SpreadsheetData[]>>({
    parcelas: [],
    ganado: [],
    cultivos: [],
  });
  const [loading, setLoading] = useState(false);

  // 🧩 Función para obtener datos reales desde la API
  
const fetchData = async () => {
  setLoading(true);
  try {
    const [parcelasResponse, ganadoResponse, cultivosResponse] = await Promise.all([
      getAllParcelas(),
      getAllGanado(),
      getAllCultivos(),
    ]);

    // Aseguramos que sean arrays válidos
    const parcelas = Array.isArray(parcelasResponse)
      ? parcelasResponse
      : parcelasResponse?.parcelas || [];
    const ganado = Array.isArray(ganadoResponse)
      ? ganadoResponse
      : ganadoResponse?.ganado || [];
    const cultivos = Array.isArray(cultivosResponse)
      ? cultivosResponse
      : cultivosResponse?.cultivos || [];

    console.log("📦 Datos recibidos:", { parcelas, ganado, cultivos });

    const formattedData: Record<TabType, SpreadsheetData[]> = {
      parcelas: parcelas.map((p: any, i: number) => ({
        id: `P-${i + 1}`,
        tipo: p.tipoSuelo || "Desconocido",
        nombre: `Parcela ${i + 1}`,
        fecha: new Date().toISOString().split("T")[0],
        estado: "activo",
      })),
      ganado: ganado.map((g: any, i: number) => ({
        id: `G-${i + 1}`,
        tipo: g.raza || "Ganado",
        nombre: g.marca_de_dueño || "Sin marca",
        fecha: g.entrada_pastoreo
          ? new Date(g.entrada_pastoreo).toISOString().split("T")[0]
          : "—",
        estado: "activo",
      })),
      cultivos: cultivos.map((c: any, i: number) => ({
        id: `C-${i + 1}`,
        tipo: c.tipo_cultivo || "Cultivo",
        nombre: c.cultivo_asignado || "Sin nombre",
        fecha: c.fecha_cultivo
          ? new Date(c.fecha_cultivo).toISOString().split("T")[0]
          : "—",
        estado: c.estado_parcela || "pendiente",
      })),
    };

    setData(formattedData);
  } catch (error) {
    console.error("❌ Error cargando datos:", error);
  } finally {
    setLoading(false);
  }
};


  // 🧭 Filtrar datos por búsqueda
  const currentData =
    data[activeTab]?.filter((item) =>
      item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const getEstadoColor = (estado: string) => {
    switch (estado.toLowerCase()) {
      case "activo":
        return "bg-green-100 text-green-800";
      case "inactivo":
        return "bg-red-100 text-red-800";
      case "pendiente":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleExport = () => {
    const headers = ["ID", "Tipo", "Nombre", "Fecha", "Estado"];
    const rows = currentData.map((item) => [
      item.id,
      item.tipo,
      item.nombre,
      item.fecha,
      item.estado,
    ]);

    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${activeTab}-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-md p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-[#DAEEC2] p-3 rounded-full">
            <TableIcon className="text-[#507d2a]" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#507d2a]">Base de Datos</h2>
            <p className="text-gray-600 text-sm">
              Consulta y exporta tus registros
            </p>
          </div>
        </div>

        <button
          onClick={handleExport}
          className="flex items-center gap-2 bg-[#507d2a] hover:bg-[#3f5f21] text-white font-semibold py-2 px-4 rounded-xl transition-colors"
        >
          <Download size={18} />
          Exportar
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b-2 border-gray-200">
        {(["parcelas", "ganado", "cultivos"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setSearchTerm("");
            }}
            className={`px-6 py-3 font-semibold rounded-t-lg transition-all ${
              activeTab === tab
                ? "bg-[#507d2a] text-white"
                : "text-gray-600 hover:text-[#507d2a]"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            <span className="ml-2 text-sm">
              ({data[tab]?.length ?? 0})
            </span>
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder={`Buscar en ${activeTab}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#507d2a] focus:outline-none transition-colors"
        />
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="animate-spin text-[#507d2a]" size={32} />
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-[#f8f8f8] border-b-2 border-gray-200">
                <th className="px-4 py-3 text-left font-semibold text-gray-700">ID</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Tipo</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Nombre</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Fecha</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Estado</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-[#f8f8f8] transition-colors"
                  >
                    <td className="px-4 py-3 font-semibold text-[#507d2a]">
                      {item.id}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{item.tipo}</td>
                    <td className="px-4 py-3 text-gray-700">{item.nombre}</td>
                    <td className="px-4 py-3 text-gray-700">{item.fecha}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${getEstadoColor(
                          item.estado
                        )}`}
                      >
                        {item.estado}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    No se encontraron registros
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Footer */}
      {!loading && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-[#507d2a]">
              {currentData.length}
            </span>{" "}
            de{" "}
            <span className="font-semibold text-[#507d2a]">
              {data[activeTab]?.length ?? 0}
            </span>{" "}
            registros mostrados
          </p>
        </div>
      )}
    </div>
  );
};

export default DataSpreadsheet;
