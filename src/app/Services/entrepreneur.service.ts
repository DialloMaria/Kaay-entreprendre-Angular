// src/app/evenements/Categorie.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from "./apiUrl";
import { EvenementModel } from '../Models/evenements.model';



@Injectable({
  providedIn: 'root'
})
export class EntrepreneurService  {
// constructor(private http: HttpClient) {}
private http = inject(HttpClient);
@Injectable({
  providedIn: 'root'
})

getEntrepreneurs() {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${apiUrl}/liste/entrepreneurs`, { headers });
  }



  getEvenement(id: number): Observable<EvenementModel> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<EvenementModel>(`${apiUrl}/evenements/${id}`, { headers });
  }

  createEvenement(evenement: FormData): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(`${apiUrl}/evenements`, evenement, { headers });
  }


  updateEvenement(id: number, evenement: FormData): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${apiUrl}/evenements/${id}`, evenement, { headers });
  }
  deleteEvenement(id: number): Observable<EvenementModel> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete<EvenementModel>(`${apiUrl}/evenements/${id}`, { headers });

  }
  // inscription un evenement
  registerForEvent(eventId: number): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${apiUrl}/evenement/${eventId}/register`, null, { headers });
  }

  // désinscription un evenement
  unsubscribeFromEvenement(id: number): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete(`${apiUrl}/evenements/${id}/unsubscribe`, { headers });
  }
}

  // Méthode pour obtenir les statistiques
