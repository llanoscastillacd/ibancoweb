import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Error } from '../models/error';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private _snackbar: MatSnackBar) { }

  configuration: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom'
  }

  success(mensaje: string) {
    this.configuration['panelClass'] = ['notif-success'];
    this._snackbar.open(mensaje, '', this.configuration);
  }

  error(error: Error) {
    this.configuration['panelClass'] = ['notif-warn'];
    let mensaje = error.mensaje;
    if (error.detalles) {
      error.detalles.forEach(e => mensaje += '. ' + e)
    }
    this._snackbar.open(mensaje, '', this.configuration);
  }

  warn(mensaje: string) {
    this.configuration['panelClass'] = ['notif-warn'];
    this._snackbar.open(mensaje, '', this.configuration);
  }
}
