export class SolicitudPagoQuery {
    nroSolicitud: number;
    idBanco: number;
    moneda: string;
    solicitadoPor?: string;
    procesoOrigen?: string;
    tipoAbono: string;
    estado: string;
    beneficiario?: string;
    fechaSolicitudDesde: string;
    fechaSolicitudHasta: string;
}
