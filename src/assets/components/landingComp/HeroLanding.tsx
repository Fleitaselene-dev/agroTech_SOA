import  { useState, useEffect } from 'react';
import { Link } from 'wouter';

const images = [
  "https://i0.wp.com/www.fceco.uner.edu.ar/wp-content/uploads/2021/12/sector-agropecuario-en-Mexico.jpg",
  "https://www.infocampo.com.ar/wp-content/uploads/2024/06/ganaderia-ganado-hacienda-aapresid.png",
  "https://imgs.elpais.com.uy/dims4/default/b3794d3/2147483647/strip/false/crop/2187x1228+0+2/resize/1200x674!/quality/90/?url=https%3A%2F%2Fel-pais-uruguay-production-web.s3.us-east-1.amazonaws.com%2Fbrightspot%2F0a%2Ff8%2Faed7ce7f49deb7ef56e52502cfc2%2Ffoto-hereford.jpg"
];

export default function HeroLanding() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setCurrent(prev => (prev + 1) % images.length), 4000);
    return () => clearInterval(interval);
  }, []);

  const goToNext = () => setCurrent(prev => (prev + 1) % images.length);
  const goToPrev = () => setCurrent(prev => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {images.map((img, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 w-full h-full duration-700 ease-in-out ${idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          {/* Contenido */}
          <div className="relative flex flex-col justify-center h-full text-left text-white px-12 sm:px-24">
            <h2 className="text-4xl sm:text-6xl font-semibold mb-4">
              Gestiona tu campo en tiempo real, desde cualquier lugar
            </h2>
            <Link to="/login" className="
        relative flex items-center karaoke justify-center h-[50px] w-[200px] cursor-pointer overflow-hidden 
        rounded-[30px] border-2 border-white bg-transparent  
        text-white transition-all duration-1500 ease-in-out 
        hover:shadow-[1px_1px_200px_#252525] hover:text-white hover:border-none
        after:content-[''] after:absolute after:left-0 after:top-0 
        after:h-[10px] after:w-[10px] after:rounded-[30px] after:bg-[#507d2a]
        after:invisible after:z-[-1] after:transition-all after:duration-1500 after:ease-in-out
        hover:after:visible hover:after:scale-[80] hover:after:translate-x-[2px]
      "
    >
              Empezar
            </Link>
          </div>
        </div>
      ))}

      {/* Botones */}
      <button onClick={goToPrev} className="absolute left-5 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full">&#10094;</button>
      <button onClick={goToNext} className="absolute right-5 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full">&#10095;</button>
    </div>
  );
}
