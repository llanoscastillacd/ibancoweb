export class LotePagoCreateReq {
    idBanco: number;
    moneda: string;
    tipoCuenta: string;
    nroCuentaCargo: string;
    referencia: string;
    exoneracionItf: boolean;
}
