import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConfiguracionTipos } from '../models/configuracion-tipos';
import { Opcion } from '../models/opcion';
import { Tipo } from '../utils/tipo.enum';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TiposService {

  private _configuracionTipos: ConfiguracionTipos;

  readonly apiUrl: string = environment.apiUrl + 'tipos';

  constructor(private http: HttpClient) { }

  public get configuracionTipos(): ConfiguracionTipos {
    return this._configuracionTipos;
  }

  fetchConfiguracionTipos(): Promise<boolean> {
    const url = this.apiUrl;
    return this.http.get<ConfiguracionTipos>(url)
      .pipe(
        map(conf => {
          this._configuracionTipos = conf;
          this._configuracionTipos.data = new Map(Object.entries(conf.data)) as Map<Tipo, Opcion[]>;
          return true;
        })
      ).toPromise();
  }
}
