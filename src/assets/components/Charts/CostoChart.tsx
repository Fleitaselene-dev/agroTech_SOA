import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type MetricType = {
  _id: string;
  totalGanancias: number;
  totalCostos: number;
};

const CostosChart: React.FC = () => {
  const [metrics, setMetrics] = useState<MetricType[]>([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/metricType")
      .then(res => res.json())
      .then((data: MetricType[]) => setMetrics(data))
      .catch(err => console.error(err));
  }, []);

  if (!metrics.length) return <p>Cargando...</p>;

  const data = {
    labels: metrics.map(m => m._id),
    datasets: [
      {
        label: "Ganancias",
        data: metrics.map(m => m.totalGanancias),
        backgroundColor: "#4CAF50",
      },
      {
        label: "Costos",
        data: metrics.map(m => m.totalCostos),
        backgroundColor: "#EF4444",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Ganancias vs Costos por Cultivo" },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <Bar data={data} options={options} />
    </div>
  );
};

export default CostosChart;
