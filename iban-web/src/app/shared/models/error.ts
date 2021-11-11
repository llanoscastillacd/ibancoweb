export class Error {

    codError: number;

    mensaje: string;
  
    timestamp: Date;
    
    detalles: string[];

    constructor(error: any) {
        this.codError = error.codError;
        this.mensaje = error.mensaje;
        this.detalles = error.detalles;
        this.timestamp = error.timestamp;
    }
}
