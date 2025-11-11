import React, { useEffect, useState } from "react";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

// Registrar componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement);

// Tipo de datos de la API
export type MetricType = {
  _id: string;
  totalGanancias: number;
  totalProduccionPorCultivo: number;
  promedioPrecioPorKg: number;
  utilidadNeta: number;
  totalCostos: number;
};

const DashboardCharts: React.FC = () => {
  const [metrics, setMetrics] = useState<MetricType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/api/metricType")
      .then((res) => res.json())
      .then((data: MetricType[]) => {
        setMetrics(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando métricas...</p>;
  if (!metrics.length) return <p>No hay datos disponibles</p>;

  const labels = metrics.map((item) => item._id);
  const primaryColor = "#507d2a";
  const secondaryColor = "#7ba84f";
  const dangerColor = "#ef4444";

  const gananciasVsCostosData = {
    labels,
    datasets: [
      {
        label: "Ganancias",
        data: metrics.map((item) => item.totalGanancias),
        backgroundColor: primaryColor,
        borderRadius: 8,
      },
      {
        label: "Costos",
        data: metrics.map((item) => item.totalCostos),
        backgroundColor: dangerColor,
        borderRadius: 8,
      },
    ],
  };

  const produccionData = {
    labels,
    datasets: [
      {
        label: "Producción (Kg)",
        data: metrics.map((item) => item.totalProduccionPorCultivo),
        borderColor: primaryColor,
        backgroundColor: "rgba(80, 125, 42, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: primaryColor,
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 5,
      },
    ],
  };

  const participacionData = {
    labels,
    datasets: [
      {
        label: "Producción Total",
        data: metrics.map((item) => item.totalProduccionPorCultivo),
        backgroundColor: ["#507d2a", "#7ba84f", "#f59e0b", "#3b82f6", "#8b5cf6", "#ec4899"],
        borderWidth: 2,
        borderColor: "#fff",
      },
    ],
  };

  const utilidadData = {
    labels,
    datasets: [
      {
        label: "Utilidad Neta",
        data: metrics.map((item) => item.utilidadNeta),
        backgroundColor: secondaryColor,
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: { font: { size: 12 }, padding: 15 },
      },
    },
    scales: {
      y: { beginAtZero: true, grid: { color: "rgba(0, 0, 0, 0.05)" } },
      x: { grid: { display: false } },
    },
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: primaryColor }}>
            Dashboard de Métricas
          </h1>
          <p className="text-gray-600">Análisis detallado de producción y rentabilidad por cultivo</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4" style={{ color: primaryColor }}>
              Ganancias vs Costos por Cultivo
            </h2>
            <div style={{ height: "300px" }}>
              <Bar data={gananciasVsCostosData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4" style={{ color: primaryColor }}>
              Producción y Rendimiento por Cultivo
            </h2>
            <div style={{ height: "300px" }}>
              <Line data={produccionData} options={chartOptions} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4" style={{ color: primaryColor }}>
              Participación en Producción Total
            </h2>
            <div style={{ height: "400px" }} className="flex items-center justify-center">
              <Doughnut
                data={participacionData}
                options={{
                  ...chartOptions,
                  maintainAspectRatio: true,
                  plugins: {
                    legend: { position: "right", labels: { font: { size: 11 }, padding: 10 } },
                  },
                }}
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4" style={{ color: primaryColor }}>
              Utilidad Neta por Cultivo
            </h2>
            <div style={{ height: "300px" }}>
              <Bar data={utilidadData} options={chartOptions} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl text-center font-semibold" style={{ color: primaryColor }}>
              Métricas Clave por Cultivo
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cultivo</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Producción (Kg)</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ganancias</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Costos</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {metrics.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium text-gray-900">{item._id}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-gray-700">{item.totalProduccionPorCultivo.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right font-medium" style={{ color: primaryColor }}>
                      ${item.totalGanancias.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right font-medium text-red-600">${item.totalCostos.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
