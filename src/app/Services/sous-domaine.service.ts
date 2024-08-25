// src/app/services/sous-domaine.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from "./apiUrl";
import { SousDomaine } from '../Models/SousDomaine.model';

@Injectable({
  providedIn: 'root'
})
export class SousDomaineService {
  private http = inject(HttpClient);

  // Méthode pour récupérer tous les sousdomaines
  getSousDomaines(): Observable<SousDomaine[]> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<SousDomaine[]>(`${apiUrl}/sousdomaines`, { headers });
  }

  // Méthode pour récupérer un sous-domaine spécifique par son ID
  getSousDomaine(id: number): Observable<SousDomaine> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<SousDomaine>(`${apiUrl}/sousdomaines/${id}`, { headers });
  }

  // Méthode pour créer un nouveau sous-domaine
  createSousDomaine(sousDomaine: SousDomaine): Observable<SousDomaine> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<SousDomaine>(`${apiUrl}/sousdomaines`, sousDomaine, { headers });
  }

  // Méthode pour mettre à jour un sous-domaine existant
  updateSousDomaine(id: number, sousDomaine: SousDomaine): Observable<SousDomaine> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<SousDomaine>(`${apiUrl}/sousdomaines/${id}`, sousDomaine, { headers });
  }

  // Méthode pour supprimer un sous-domaine par son ID
  deleteSousDomaine(id: number): Observable<SousDomaine> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete<SousDomaine>(`${apiUrl}/sousdomaines/${id}`, { headers });
  }
}
