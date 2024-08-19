// src/app/services/domaine.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from "./apiUrl";
import { SousDomaineModel } from '../Models/sous-domaines.model';



@Injectable({
  providedIn: 'root'
})
export class SousDomaineService {
// constructor(private http: HttpClient) {}
private http = inject(HttpClient);
@Injectable({
  providedIn: 'root'
})

getSousDomaines(){
  const token = localStorage.getItem('access_token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  return this.http.get<any>(`${apiUrl}/sous-domaines`, { headers });
}
}

  // Méthode pour obtenir les statistiques
