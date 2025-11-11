import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

type MetricType = {
  _id: string;
  totalProduccionPorCultivo: number;
};

const ProduccionChart: React.FC = () => {
  const [metrics, setMetrics] = useState<MetricType[]>([]);

  useEffect(() => {
    fetch("http://localhost:3402/api/metricType")
      .then(res => res.json())
      .then((data: MetricType[]) => setMetrics(data))
      .catch(err => console.error(err));
  }, []);

  if (!metrics.length) return <p>Cargando...</p>;

  const data = {
    labels: metrics.map(m => m._id),
    datasets: [
      {
        label: "Producción (Kg)",
        data: metrics.map(m => m.totalProduccionPorCultivo),
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Producción por Cultivo" },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <Line data={data} options={options} />
    </div>
  );
};

export default ProduccionChart;
