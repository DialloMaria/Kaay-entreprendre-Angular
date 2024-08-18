// import { HttpEvent, HttpHandlerFn, HttpHeaders, HttpRequest } from "@angular/common/http";
// import { Observable } from "rxjs";

// export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
//   // Récupérer le token depuis le localStorage
//   const token = localStorage.getItem('access_token');

//   // Cloner la requête pour ajouter les headers
//   let authReq = req;

//   if (token) {
//     const headers = new HttpHeaders({
//       'Authorization': `Bearer ${token}`
//     });

//     authReq = req.clone({ headers });
//   }

//   // Passer la requête suivante dans la chaîne d'intercepteurs
//   return next(authReq);
// }
