// src/app/sousdomaines/sousdomaine.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { sousdomaine } from '../Models/sousdomaines.model';
import { apiUrl } from "./apiUrl";
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SousdomaineService  {
// constructor(private http: HttpClient) {}
private http = inject(HttpClient);
@Injectable({
  providedIn: 'root'
})

inscrireUtilisateur(sousDomaineId: number): Observable<any> {
  const token = localStorage.getItem('access_token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  return this.http.post<any>(`${apiUrl}/domaines/${sousDomaineId}/inscrire`, {}, { headers });
}


getsousdomainesByDomaine(domaineId: number): Observable<sousdomaine[]> {
  const token = localStorage.getItem('access_token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  return this.http.get<{ message: string, data: sousdomaine[] }>(`${apiUrl}/sousdomainesbydomaine/${domaineId}`, { headers })
    .pipe(
      map(response => response.data) // Extraire la propriété 'data'
    );
}



  getsousdomaines() {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${apiUrl}/sousdomaines`, { headers });

  }

  getStats() {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${apiUrl}/dashboard/super-admin`, { headers });
  }


  getsousdomaine(id: number): Observable<sousdomaine> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<sousdomaine>(`${apiUrl}/sousdomaines/${id}`, { headers });
  }

  createsousdomaine(sousdomaine: sousdomaine): Observable<sousdomaine> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<sousdomaine>(`${apiUrl}/sousdomaines`, sousdomaine, { headers });

  }

  updatesousdomaine(id: number, sousdomaine: sousdomaine): Observable<sousdomaine> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<sousdomaine>(`${apiUrl}/sousdomaines/${id}`, sousdomaine, { headers });
  }

  deletesousdomaine(id: number): Observable<sousdomaine> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete<sousdomaine>(`${apiUrl}/sousdomaines/${id}`, { headers });

  }
}

  // Méthode pour obtenir les statistiques
