// src/app/services/domaine.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Domaine } from '../Models/domaine.model';

@Injectable({
  providedIn: 'root'
})
export class DomaineService {
  private apiUrl = 'http://127.0.0.1:8000/api/domaines';

  constructor(private http: HttpClient) {}

  getDomaines(): Observable<Domaine[]> {
    return this.http.get<Domaine[]>(this.apiUrl);
  }


  getDomaine(id: number): Observable<Domaine> {
    return this.http.get<Domaine>(`${this.apiUrl}/${id}`);
  }

  createDomaine(domaine: Domaine): Observable<Domaine> {
    return this.http.post<Domaine>(this.apiUrl, domaine);
  }

  updateDomaine(id: number, domaine: Domaine): Observable<Domaine> {
    return this.http.put<Domaine>(`${this.apiUrl}/${id}`, domaine);
  }

  deleteDomaine(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Méthode pour obtenir les statistiques
  getStats(): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.apiUrl}/dashboard/super-admin`, { headers });
  }
}
