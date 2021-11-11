export interface SolicitudPagoDto {
    nroSolicitud: number;
    banco: string;
    moneda: string;
    monto: number;
    estado: string;
    tipoAbono: string;
    tipoCuenta: string;
    nroCuenta: string;
    tipoDocumentoIdentidad: string;
    nroDocumentoIdentidad: string;
    nombreBeneficiario: string;
    procesoOrigen: string;
    nroReferencia: string;
    solicitadoPor: string;
    fechaHoraSolicitud: Date;
    validacionIdBeneficiario: string;
    correoElectronico: string;
    nroCelular: string;
    resultadoProceso: string;
    documentos: DocumentoDto[];
}

export interface DocumentoDto {
    tipoDocumento: string;
    moneda: string;
    monto: number;
    fechaVencimiento: string;
}