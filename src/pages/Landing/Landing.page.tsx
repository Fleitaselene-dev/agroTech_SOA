import { Link } from "wouter";
import Navbar from "../../assets/components/layout/Navbar";
import HeroLanding from "../../assets/components/landingComp/HeroLanding";
import Footer from "../../assets/components/layout/Footer";
import Servicios from "../../assets/components/landingComp/Servicios";
import ImpactSection from "../../assets/components/landingComp/ImpacSeccion";

import { FeaturesSection } from "../../assets/components/landingComp/FeaturesSeccion";

export default function Landing() {
  return (
    <div>
      <nav>
        <Navbar />
      </nav>
      <section>
        <HeroLanding />
      </section>
      <section>
        <FeaturesSection />
      </section>
      <section>
        <ImpactSection />
      </section>
      <section>
        <Servicios />
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold  mb-6">
            Transforma la gestión de tu campo hoy
          </h2>
          <p className="text-xl  mb-8">
            Únete a cientos de productores que ya optimizaron su operación con
            nuestra plataforma
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/login"
              className="
                relative flex items-center karaoke justify-center h-[50px] w-[200px] cursor-pointer overflow-hidden 
                rounded-[30px] border-2 border-[#507d2a] bg-transparent 
                text-[#507d2a] transition-all duration-1500 ease-in-out 
                hover:shadow-[1px_1px_200px_#252525] hover:text-white hover:border-none
                after:content-[''] after:absolute after:left-0 after:top-0 
                after:h-2.5 after:w-2.5 after:rounded-[30px] after:bg-[#3c661a]
                after:invisible after:z-[-1] after:transition-all after:duration-1500 after:ease-in-out
                hover:after:visible hover:after:scale-[80] hover:after:translate-x-0.5
              "
            >
              <span className="z-1 font-extrabold tracking-[1px]">Empezar</span>
            </Link>
          </div>
        </div>
      </section>

      <section>
        <Footer />
      </section>
    </div>
  );
}
