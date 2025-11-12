// 🌱 ---------- CULTIVO ----------
export interface ICultivo {
  parcela: any;
  tipo_cultivo: string;
  fecha_cultivo: string;
  ph: number;
  cantidad_parcelas: number;
  estado_parcela: string;
  cultivo_asignado: string;
  tipo_suelo?: string;
  fertilizacion_tipo?: string;
  costo_semillas: number;
  fecha_estimada_de_cosecha: string;
  tipo_riego?: string;
  plagas?: string;
  pesticidas?: string;
  pesticida_fecha_aplicacion?: string;
  pesticida_costo_por_aplicacion?: number;
  plagas_o_onfermedades: string;
  fecha_cosecha?: string;
  total_cosecha_kg?: number;
  precio_por_kg?: number;
  ganancias_totales?: number;
  produccion_total_kg?: number;
  rendimiento_kg_por_ha?: number;
  calidad_cosecha?: string;
  fecha_inicio_cosecha?: string;
  fecha_fin_cosecha?: string;
  costo_fertilizantes?: number;
  costo_gasoil?: number;
  ingresos_por_venta?: number;
  margen_bruto?: number;
}

const API_URL = "http://localhost:4000";

// 🌾 Crear Cultivo
export const createCultivo = async (data: ICultivo) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/api/cultivos/createCultivos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Error al crear el cultivo.");
  }

  return response.json();
};

// 🌾 Obtener todos los cultivos
export const getAllCultivos = async (): Promise<ICultivo[]> => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/api/cultivos`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener los cultivos");
  }

  
  const data = await response.json();
  return data.result || []; // 
};
