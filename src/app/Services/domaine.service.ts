// src/app/services/domaine.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Domaine } from '../Models/domaine.model';
import { apiUrl } from "./apiUrl";


@Injectable({
  providedIn: 'root'
})
export class DomaineService { getSousDomaines(domaineId: number) {
  throw new Error('Method not implemented.');
}
// constructor(private http: HttpClient) {}
private http = inject(HttpClient);
@Injectable({
  providedIn: 'root'
})

  getDomaines() {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${apiUrl}/domaines`, { headers });

  }

  getStats() {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${apiUrl}/dashboard/super-admin`, { headers });
  }


  getDomaine(id: number): Observable<Domaine> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Domaine>(`${apiUrl}/domaines/${id}`, { headers });
  }

  createDomaine(domaine: Domaine): Observable<Domaine> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<Domaine>(`${apiUrl}/domaines`, domaine, { headers });

  }

  updateDomaine(id: number, domaine: Domaine): Observable<Domaine> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<Domaine>(`${apiUrl}/domaines/${id}`, domaine, { headers });
  }

  deleteDomaine(id: number): Observable<Domaine> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete<Domaine>(`${apiUrl}/domaines/${id}`, { headers });

  }
}

  // Méthode pour obtenir les statistiques
