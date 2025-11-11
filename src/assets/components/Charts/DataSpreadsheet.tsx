import { useState } from "react";
import { Table as TableIcon, Download } from "lucide-react";

interface SpreadsheetData {
  id: string;
  tipo: string;
  nombre: string;
  fecha: string;
  estado: "activo" | "inactivo" | "pendiente";
}

const DataSpreadsheet = () => {
  const [activeTab, setActiveTab] = useState<"parcelas" | "ganado" | "cultivos">("parcelas");
  const [searchTerm, setSearchTerm] = useState("");

  // Datos de ejemplo
  const mockData: Record<string, SpreadsheetData[]> = {
    parcelas: [
      {
        id: "P001",
        tipo: "Parcela",
        nombre: "Parcela A",
        fecha: "2024-01-15",
        estado: "activo",
      },
      {
        id: "P002",
        tipo: "Parcela",
        nombre: "Parcela B",
        fecha: "2024-02-20",
        estado: "activo",
      },
      {
        id: "P003",
        tipo: "Parcela",
        nombre: "Parcela C",
        fecha: "2024-03-10",
        estado: "pendiente",
      },
    ],
    ganado: [
      {
        id: "G001",
        tipo: "Bovino",
        nombre: "Lote Vacunos 01",
        fecha: "2024-01-20",
        estado: "activo",
      },
      {
        id: "G002",
        tipo: "Ovino",
        nombre: "Lote Ovejas 02",
        fecha: "2024-02-15",
        estado: "activo",
      },
    ],
    cultivos: [
      {
        id: "C001",
        tipo: "Cereal",
        nombre: "Maíz Premium",
        fecha: "2024-03-01",
        estado: "activo",
      },
      {
        id: "C002",
        tipo: "Legumbre",
        nombre: "Frijol Negro",
        fecha: "2024-03-15",
        estado: "pendiente",
      },
    ],
  };

  const currentData = mockData[activeTab].filter((item) => item.nombre.toLowerCase().includes(searchTerm.toLowerCase()));

  const getEstadoColor = (estado: string) => {
    switch (estado) {
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

  const getEstadoLabel = (estado: string) => {
    switch (estado) {
      case "activo":
        return "Activo";
      case "inactivo":
        return "Inactivo";
      case "pendiente":
        return "Pendiente";
      default:
        return estado;
    }
  };

  const handleExport = () => {
    // Lógica para exportar datos a CSV
    const headers = ["ID", "Tipo", "Nombre", "Fecha", "Estado"];
    const rows = currentData.map((item) => [item.id, item.tipo, item.nombre, item.fecha, getEstadoLabel(item.estado)]);

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");

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
            <p className="text-gray-600 text-sm">Consulta todos tus registros</p>
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
              activeTab === tab ? "bg-[#507d2a] text-white" : "text-gray-600 hover:text-[#507d2a]"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            <span className="ml-2 text-sm">({mockData[tab].length})</span>
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

      {/* Table */}
      <div className="overflow-x-auto">
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
                <tr key={index} className="border-b border-gray-200 hover:bg-[#f8f8f8] transition-colors">
                  <td className="px-4 py-3 font-semibold text-[#507d2a]">{item.id}</td>
                  <td className="px-4 py-3 text-gray-700">{item.tipo}</td>
                  <td className="px-4 py-3 text-gray-700">{item.nombre}</td>
                  <td className="px-4 py-3 text-gray-700">{item.fecha}</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getEstadoColor(item.estado)}`}>{getEstadoLabel(item.estado)}</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                  No se encontraron registros
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Stats */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-[#507d2a]">{currentData.length}</span> de{" "}
          <span className="font-semibold text-[#507d2a]">{mockData[activeTab].length}</span> registros mostrados
        </p>
      </div>
    </div>
  );
};

export default DataSpreadsheet;
