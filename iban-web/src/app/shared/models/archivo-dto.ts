import { Byte } from "@angular/compiler/src/util";

export interface ArchivoDto {
    nombreArchivo: string;
    pesoBytes: number;
    contenidoArchivo: Byte[];
    fechaHoraGeneracion: Date;
    generadoPor: string;
}
