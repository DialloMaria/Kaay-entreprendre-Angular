import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from './apiUrl';
import { GuideModel } from '../Models/guides.model';
import { Ressource } from '../models/ressource.model';

@Injectable({
  providedIn: 'root'
})
export class RessourceService {
  private headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
  });

  constructor(private http: HttpClient) { }

  getRessourcesByGuideId(guideId: number): Observable<GuideModel[]> {
    return this.http.get<GuideModel[]>(`${apiUrl}/guides/${guideId}`, { headers: this.headers });
  }

  getRessource(id: number): Observable<Ressource> {
    return this.http.get<Ressource>(`${apiUrl}/ressources/${id}`, { headers: this.headers });
  }


  getRessources(): Observable<Ressource> {
    return this.http.get<Ressource>(`${apiUrl}/ressources`, { headers: this.headers });
  }


  createRessource(data: Ressource): Observable<Ressource> {
    return this.http.post<Ressource>(`${apiUrl}/ressources`, data, { headers: this.headers });
  }

  updateRessource(id: number, data: Ressource): Observable<Ressource> {
    return this.http.put<Ressource>(`${apiUrl}/ressources/${id}`, data, { headers: this.headers });
  }

  deleteRessource(id: number): Observable<void> {
    return this.http.delete<void>(`${apiUrl}/ressources/${id}`, { headers: this.headers });
  }

  getRessourcesByGuide(guideId: number): Observable<Ressource[]> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Ressource[]>(`${apiUrl}/guides/${guideId}/ressources`, { headers });
  }
}
