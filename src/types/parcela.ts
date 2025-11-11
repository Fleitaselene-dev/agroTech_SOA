export interface parcela{
    _id:number;
    superficie: number,
    ph_suelo:number,
    coordenadas:{
        latitud:number;
        longitud:number;
    }
    tipoSuelo:string,
    estadoSuelo:string;
}
export interface ParcelaResponse {
  msg: string;
  result: parcela[];
}
