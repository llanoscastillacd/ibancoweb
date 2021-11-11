export class LotePagoProcesadoReq {
    solicitudesProcesadas: number[];
    solicitudesRechazadas: number[];

    constructor() {
        this.solicitudesProcesadas = [];
        this.solicitudesRechazadas = [];
    }
}
