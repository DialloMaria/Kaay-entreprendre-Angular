import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Domaine } from '../Models/domaine.model';
import { apiUrl } from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class DomaineService {
  private http = inject(HttpClient);

  // Obtenir la liste des domaines
  getDomaines(): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${apiUrl}/domaines`, { headers });
  }

  // Obtenir les sous-domaines pour un domaine spécifique
  getSousDomaines(domaineId: number): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${apiUrl}/domaines/${domaineId}/sous-domaines`, { headers });
  }

  // Obtenir les statistiques du tableau de bord
  getStats(): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${apiUrl}/dashboard/super-admin`, { headers });
  }

  // Obtenir un domaine spécifique
  getDomaine(id: number): Observable<Domaine> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Domaine>(`${apiUrl}/domaines/${id}`, { headers });
  }

  // Créer un nouveau domaine
  createDomaine(domaine: Domaine): Observable<Domaine> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<Domaine>(`${apiUrl}/domaines`, domaine, { headers });
  }

  // Mettre à jour un domaine existant
  updateDomaine(id: number, domaine: Domaine): Observable<Domaine> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<Domaine>(`${apiUrl}/domaines/${id}`, domaine, { headers });
  }

  // Supprimer un domaine
  deleteDomaine(id: number): Observable<Domaine> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<Domaine>(`${apiUrl}/domaines/${id}`, { headers });
  }
}
