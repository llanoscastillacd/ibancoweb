import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Error } from '../models/error';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        return next.handle(request).pipe(catchError(err => {
            console.error(err);
            let msgGenerico: string = 'Se presento un problema, reporte e intente luego';
            let error;
            if (err.error?.mensaje) {
                error = new Error(err.error);
            } else {
                error = new Error({ 'codError': 9999, 'mensaje': msgGenerico, 'timestamp': new Date()})
            }
            return throwError(error);
        }));
    }
}
