export interface LotePagoDto {
    nroLote: number;
    banco: string;
    moneda: string;
    tipoCuenta: string;
    nroCuentaCargo: string;
    nroRegistros: number;
    montoTotal: number;
    referencia: string;
    exoneracionItf: string;
    estado: string;
    registradoPor: string;
    fechaHoraRegistro: Date;
}
