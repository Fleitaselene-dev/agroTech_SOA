export type Ganado = {
  id: number;
  nombre: string;
  proposito: string;
  raza: string;
  edad: number;
  ultimaRevision: string;
  lat: number;
  lng: number;
};

export type Sensor = {
  id: number;
  nombre: string;
  lat: number;
  lng: number;
};

// Datos de ejemplo (puedes reemplazarlos por tus datos reales)
export const ganadoData: Ganado[] = [
  {
    id: 1,
    nombre: "Vaca Alfa",
    proposito: "Lechera",
    raza: "Holando",
    edad: 24,
    ultimaRevision: "2025-09-12",
    lat: -26.53,
    lng: -58.76,
  },
  {
    id: 2,
    nombre: "Toro Beta",
    proposito: "Reproductor",
    raza: "Braford",
    edad: 36,
    ultimaRevision: "2025-10-20",
    lat: -26.54,
    lng: -58.77,
  },
];

export const sensorData: Sensor[] = [
  { id: 1, nombre: "Sensor Norte", lat: -26.52, lng: -58.75 },
  { id: 2, nombre: "Sensor Sur", lat: -26.55, lng: -58.78 },
];
