import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SolicitudPagoDto } from '../models/solicitud-pago-dto';
import { SolicitudPagoQuery } from '../models/solicitud-pago-query';

@Injectable({
  providedIn: 'root'
})
export class SolicitudPagoService {

  readonly apiUrl: string = environment.apiUrl + 'solicitudes-pago';
  constructor(private http: HttpClient) { }

  querySolicitudPago(solicitudPagoQuery: SolicitudPagoQuery): Observable<SolicitudPagoDto[]> {
    const url = this.apiUrl + '/query';
    return this.http.post<SolicitudPagoDto[]>(url, solicitudPagoQuery);
  }

  findByNroSolicitud(nroSolicitud: number): Observable<SolicitudPagoDto> {
    const url = this.apiUrl + '/' + nroSolicitud + '/detalles';
    return this.http.get<SolicitudPagoDto>(url);
  }

  findByNroLote(nroLote: number): Observable<SolicitudPagoDto[]> {
    const url = this.apiUrl + '/' + nroLote + '/lote-perteneciente';
    return this.http.get<SolicitudPagoDto[]>(url);
  }

  deleteSolicitudPago(nroSolicitud: number): Observable<number> {
    const url = this.apiUrl + '/' + nroSolicitud + '/anular';
    return this.http.put<number>(url, null);
  }

}
