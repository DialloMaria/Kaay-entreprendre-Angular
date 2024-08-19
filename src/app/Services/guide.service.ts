// src/app/guides/Categorie.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  GuideModel } from '../Models/guides.model';
import { apiUrl } from "./apiUrl";


@Injectable({
  providedIn: 'root'
})
export class GuideService  {
// constructor(private http: HttpClient) {}
private http = inject(HttpClient);
@Injectable({
  providedIn: 'root'
})

  getGuides() {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${apiUrl}/guides`, { headers });

  }



  getGuide(id: number): Observable<GuideModel> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<GuideModel>(`${apiUrl}/guides/${id}`, { headers });
  }

  createGuide(guide: FormData): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(`${apiUrl}/guides`, guide, { headers });
  }


  updateGuide(id: number, guide: FormData): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${apiUrl}/guides/${id}`, guide, { headers });
  }
  deleteGuide(id: number): Observable<GuideModel> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete<GuideModel>(`${apiUrl}/guides/${id}`, { headers });

  }
}

  // Méthode pour obtenir les statistiques
