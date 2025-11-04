import { ArrowRight } from "lucide-react";

export default function Servicios() {
  return (
    <section className="min-h-screen bg-[#507d2a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center h-auto py-12">

          {/* Left Content */}
          <div className="text-white space-y-8">
            <div className="inline-block">
              <span className="text-sm uppercase tracking-wider font-semibold px-4 py-2 bg-white/10 rounded-full border border-white/20">
                Servicios
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-6xl font-bold leading-tight">
              Gestiona tu campo en tiempo real
            </h1>

            <p className="text-xl md:text-1xl text-green-100 leading-relaxed max-w-xl">
              Plataforma todo en uno que centraliza inventario, mapa interactivo, panel agroclimático, estado del suelo y chatbot asistente de tu explotación agropecuaria. Información actualizada al instante para decisiones más inteligentes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="px-8 py-4 bg-white text-[#507d2a] rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all hover:scale-105 shadow-lg flex items-center gap-2">
                Comenzar 
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Content - Mockup */}
          <div className="relative">
            <div className="relative bg-gray-800 rounded-t-2xl p-3 shadow-2xl">
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                {/* Notch */}
                <div className="h-6 bg-gray-900 flex items-center justify-center">
                  <div className="w-32 h-4 bg-gray-800 rounded-b-xl"></div>
                </div>

                {/* Screen content */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 aspect-video">
                  {/* Dashboard Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#507d2a] rounded-lg flex items-center justify-center text-white font-bold">
                        A
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-800">Campo San Miguel</div>
                        <div className="text-xs text-gray-500">Actualizado hace 2 min</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 bg-green-100 rounded-lg"></div>
                      <div className="w-8 h-8 bg-green-100 rounded-lg"></div>
                    </div>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <div className="text-xs text-gray-500 mb-1">Hectáreas</div>
                      <div className="text-lg font-bold text-[#507d2a]">350</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <div className="text-xs text-gray-500 mb-1">Ganado total</div>
                      <div className="text-lg font-bold text-[#507d2a]">24</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <div className="text-xs text-gray-500 mb-1">Cultivos</div>
                      <div className="text-lg font-bold text-[#507d2a]">12</div>
                    </div>
                  </div>

                  {/* Chart visualization */}
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-xs text-gray-600 mb-3 font-semibold">Producción últimos 6 meses</div>
                    <div className="flex items-end justify-between h-24 gap-1">
                      {[60, 75, 85, 70, 95, 100].map((h, i) => (
                        <div key={i} className="bg-gradient-to-t from-[#507d2a] to-[#6b9d3d] w-full rounded-t" style={{ height: `${h}%` }}></div>
                      ))}
                    </div>
                  </div>

                  {/* Small info cards */}
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <div className="bg-green-50 rounded p-2">
                      <div className="text-xs text-gray-600">Estado general</div>
                      <div className="text-xs font-semibold text-[#507d2a]">Óptimo</div>
                    </div>
                    <div className="bg-green-50 rounded p-2">
                      <div className="text-xs text-gray-600">Alertas</div>
                      <div className="text-xs font-semibold text-[#507d2a]">0 activas</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-3 bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-2xl shadow-lg">
              <div className="absolute inset-x-0 -bottom-1 h-1 bg-gray-900/50 rounded-full mx-auto w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
