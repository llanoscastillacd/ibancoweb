import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LotePagoCreateReq } from '../models/lote-pago-create-req';
import { LotePagoDto } from '../models/lote-pago-dto';
import { LotePagoQuery } from '../models/lote-pago-query';
import { LotePagoUpdateReq } from '../models/lote-pago-update-req';
import { ArchivoDto } from '../../shared/models/archivo-dto';
import { LotePagoProcesadoReq } from '../models/lote-pago-procesado-req';
import { LoteSolicitudDto } from '../models/lote-solicitud-dto';

@Injectable({
  providedIn: 'root'
})
export class LotePagoService {

  readonly apiUrl: string = environment.apiUrl + 'lotes-pago';
  constructor(private http: HttpClient) { }

  queryLotePago(lotePagoQuery: LotePagoQuery): Observable<LotePagoDto[]> {
    const url = this.apiUrl + '/query';
    return this.http.post<LotePagoDto[]>(url, lotePagoQuery);
  }

  create(lotePagoCreateReq: LotePagoCreateReq): Observable<LotePagoCreateReq> {
    const url = this.apiUrl;
    return this.http.post<LotePagoCreateReq>(url, lotePagoCreateReq);
  }

  update(nroLote: number, lotePagoUpdateReq: LotePagoUpdateReq) {
    const url = this.apiUrl + '/' + nroLote;
    return this.http.put<number>(url, lotePagoUpdateReq);
  }

  generateFile(nroLote: number): Observable<ArchivoDto> {
    const url = this.apiUrl + '/' + nroLote + '/generar-archivo';
    return this.http.get<ArchivoDto>(url);
  }

  downloadFile(nroLote: number): Observable<ArchivoDto> {
    const url = this.apiUrl + '/' + nroLote + '/descargar-archivo';
    return this.http.get<ArchivoDto>(url);
  }

  procesarLotePago(nroLote: number, lotePagoProcesadoReq: LotePagoProcesadoReq) {
    const url = this.apiUrl + '/' + nroLote + '/procesar-lote';
    return this.http.put<number>(url, lotePagoProcesadoReq);
  }

  findByNroSolicitud(nroSolicitud: number): Observable<LoteSolicitudDto[]> {
    const url = this.apiUrl + '/' + nroSolicitud + '/por-solicitud';
    return this.http.get<LoteSolicitudDto[]>(url);
  }

  deleteLotePago(nroLote: number): Observable<number> {
    const url = this.apiUrl + '/' + nroLote + '/anular';
    return this.http.put<number>(url, null);
  }
}
