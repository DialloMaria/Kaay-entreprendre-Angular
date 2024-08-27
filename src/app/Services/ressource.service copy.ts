import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from './apiUrl';
import { Ressource } from '../Models/ressources.model';

@Injectable({
  providedIn: 'root'
})
export class RessourceService {

  constructor(private http: HttpClient) { }

  getRessourcesByGuideId(guideId: number): Observable<Ressource[]> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Ressource[]>(`${apiUrl}/ressources/${guideId}`, { headers });
  }
}
