

export default function ImpactSection() {
  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Imagen */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute -top-6 -right-6 w-full h-full bg-[#2d4a1a] rounded-2xl -z-10" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-[4/3] relative">
                <img 
                  src="/soci.jpg" 
                  alt="Productor trabajando en el campo" 
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Texto */}
          <div className="space-y-6 order-1 lg:order-2">
            <div className="inline-block">
              <span className="text-sm uppercase tracking-wider font-semibold text-[#507d2a]">
                IMPACTO
              </span>
              <div className="h-1 w-12 bg-[#507d2a] mt-2" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Una gestión eficiente{' '}
              <span className="text-[#507d2a]">promueve el crecimiento sostenible</span> de tu explotación
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed">
              Nuestra plataforma centraliza la información clave de tu campo, permitiendo tomar decisiones inteligentes que incrementan la productividad, reducen pérdidas y fomentan la sustentabilidad.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
