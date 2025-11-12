export interface Iganado {
  readonly marca_de_dueño: string;
  readonly raza: string;
  readonly sexo: "Hembra" | "Macho";
  readonly edad: number;
  readonly vacunaciones: {
    nombre: string;
    fecha: Date;
    proxima?: Date;
    docis: number;
  };
  readonly antiparacitario: number;
  readonly vitaminas: string;
  readonly entrada_pastoreo: Date;
  readonly salida_pastore: Date;
  readonly total_vacas: number;
  readonly proposito: "reproductor" | "matadero" | "cría";
  readonly coordenadas: {
    latitud: number;
    longitud: number;
  };

  readonly inicio_ciclo_celo?: Date;
  readonly fin_ciclo_celo?: Date;
  readonly isPregnant?: boolean;
  readonly fechaProbableParto?: Date;
  readonly horaIngresoMatadero?: string;
  readonly fecha_inicio_ayuno?: Date;
  readonly vacas_perdidas?: number;
}

const API_URL = "http://localhost:4000";



export const getAllGanado = async (): Promise<Iganado[]> => {
  const response = await fetch(`${API_URL}/api/ganado/findAll`, {
    method: "GET",
     headers: {
          Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
        },

  });
  if (!response.ok) {
    throw new Error("Error al obtener el ganado");
  }
  const data = await response.json();
  return data.result || []; // 
};

export interface GanadoFormState {
  marca_de_dueño: string;
  raza: string;
  sexo: "Hembra" | "Macho" | "";
  edad: string;
  proposito: "reproductor" | "matadero" | "cría" | "";
  antiparacitario: string;
  vitaminas: string;
  entrada_pastoreo: string;
  salida_pastore: string;
  total_vacas: string;
  vac_nombre: string;
  vac_fecha: string;
  vac_docis: string;
  inicio_ciclo_celo: string;
  fin_ciclo_celo: string;
  isPregnant: boolean;
  fechaProbableParto: string;
  horaIngresoMatadero: string;
  fecha_inicio_ayuno: string;
  vacas_perdidas: string;
}