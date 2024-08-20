import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Assurez-vous que le chemin est correct

@Injectable({
  providedIn: 'root' // Pour rendre le service injectable sans module
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Récupération du token via AuthService
    const authToken = this.authService.getToken();

    // Clonage de la requête avec le header Authorization
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    });

    // Envoi de la requête modifiée
    return next.handle(authReq);
  }
}
