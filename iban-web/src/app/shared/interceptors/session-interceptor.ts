import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SessionService } from "../services/session.service";

@Injectable()
export class SessionIncerceptor implements HttpInterceptor {

  constructor(private sesionService: SessionService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    let codUsuario = this.sesionService.codUsuario? this.sesionService.codUsuario : 'USUARIO_NULO';
    
    let request = req.clone({
      setHeaders: {
        codUsuario: codUsuario,
      }
    });

    return next.handle(request);
  }

}