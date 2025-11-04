import { Layers, CloudSun, Sprout, BarChart3, Thermometer } from "lucide-react";

export default function AgroFeatures() {
  const features = [
    { icon: <Layers className="w-6 h-6 text-green-700" />, title: <>Monitorear <strong>el suelo</strong></>, description: "Analiza humedad, pH y fertilidad para mejorar el rendimiento del cultivo." },
    { icon: <CloudSun className="w-6 h-6 text-green-700" />, title: <>Controlar <strong>el clima</strong></>, description: "Consulta temperatura, lluvias y pronósticos para anticiparte a condiciones adversas." },
    { icon: <Sprout className="w-6 h-6 text-green-700" />, title: <>Gestionar <strong>cultivos</strong></>, description: "Registra fechas, fertilización y rendimiento para optimizar cada ciclo." },
    { icon: <Layers className="w-6 h-6 text-green-700" />, title: <>Supervisar <strong>ganado</strong></>, description: "Controla cantidad, raza, edad y estado sanitario de los animales." },
    { icon: <BarChart3 className="w-6 h-6 text-green-700" />, title: <>Registrar <strong>inventario</strong></>, description: "Lleva el control de insumos, cosechas y ventas con métricas precisas." },
    { icon: <Thermometer className="w-6 h-6 text-green-700" />, title: <>Integrar <strong>sensores</strong></>, description: "Automatiza mediciones de suelo, clima y salud animal en tiempo real." },
  ];

  return (
    <section className="py-10 bg-white">
      <h1 className="font-bold text-center text-3xl p-8">¿Por qué elegirnos?</h1>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 text-center px-6">
        {features.map((feature, idx) => (
          <div key={idx} className="flex flex-col items-center text-md">
            <div className="bg-green-100 p-3 rounded-full flex items-center justify-center mb-3">
              {feature.icon}
            </div>
            <h3 className="font-semibold mb-1">{feature.title}</h3>
            <p className="text-gray-600 leading-snug text-sm max-w-[180px]">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
