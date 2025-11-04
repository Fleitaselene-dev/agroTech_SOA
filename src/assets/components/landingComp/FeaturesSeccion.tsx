
import { Sprout, Users, Map, BarChart3, Bot, Thermometer } from "lucide-react";

export function FeaturesSection() {
  const features = [
    { icon: <Sprout className="w-8 h-8" />, title: "Gestión de Cultivos", description: "Supervisa tus siembras, cosechas y el estado de los cultivos en tiempo real desde cualquier dispositivo." },
    { icon: <Users className="w-8 h-8" />, title: "Control de Ganadería", description: "Registra y gestiona el inventario de ganado, pastoreo, alimentación, vacunaciones y más, con seguimiento detallado." },
    { icon: <Map className="w-8 h-8" />, title: "Mapa Dinámico", description: "Visualiza la ubicación de tu ganado y parcelas agrícolas mediante un mapa interactivo y actualizado al instante." },
    { icon: <Thermometer className="w-8 h-8" />, title: "Monitoreo Agroclimático", description: "Consulta las condiciones del clima y el estado del suelo para optimizar tus decisiones de cultivo y pastoreo." },
    { icon: <BarChart3 className="w-8 h-8" />, title: "Reportes en Tiempo Real", description: "Analiza métricas clave de tu producción con dashboards intuitivos y datos siempre actualizados." },
    { icon: <Bot className="w-8 h-8" />, title: "Asistente Inteligente", description: "Consulta al chatbot para obtener rápidamente datos, consejos, análisis y guías personalizadas." },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Todo lo que necesitas en una sola plataforma
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Centraliza todas las operaciones de tu campo con herramientas diseñadas específicamente para el sector agropecuario
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-xl border-2 border-gray-100 hover:border-[#507d2a] hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-green-50 rounded-lg flex items-center justify-center text-[#507d2a] mb-4 group-hover:bg-[#507d2a] group-hover:text-white transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
