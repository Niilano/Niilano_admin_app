import { HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('adminToken');

    if (token) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true'
        }
      });

      return next.handle(authReq);
    } else {

      const newReq = req.clone({
        setHeaders: {
          'ngrok-skip-browser-warning': 'true'
        }
      });

      return next.handle(newReq);
    }
  }

  constructor() { }
}
