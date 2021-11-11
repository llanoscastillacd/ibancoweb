import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private _codUsuario: string;

  constructor() { }

  public get codUsuario(): string {
    return this._codUsuario;
  }

  setCodUsuario(codUsuario: string) {
    this._codUsuario = codUsuario;
  }


}
