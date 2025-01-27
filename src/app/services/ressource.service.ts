// src/app/services/ressource.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Guide } from '../models/guide.model';
import { Ressource } from '../models/ressource.model';

@Injectable({
  providedIn: 'root'
})
export class RessourceService {
  private ressourcesUrl = 'http://127.0.0.1:8000/api/ressources';
  private guidesUrl = 'http://127.0.0.1:8000/api/guides'; // Mettez à jour si l'URL est différente

  constructor(private http: HttpClient) { }

  private getHttpHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
    });
  }
  getRessourcesByGuideId(guideId: number): Observable<Ressource[]> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Ressource[]>(`${this.ressourcesUrl}?guideId=${guideId}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  getRessources(): Observable<Ressource[]> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Ressource[]>(this.ressourcesUrl, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getGuides(): Observable<Guide[]> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Guide[]>(this.guidesUrl, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  addRessource(ressource: Ressource): Observable<Ressource> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<Ressource>(this.ressourcesUrl, ressource, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  updateRessource(id: number, ressource: Ressource): Observable<Ressource> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<Ressource>(`${this.ressourcesUrl}/${id}`, ressource, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  deleteRessource(id: number): Observable<void> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<void>(`${this.ressourcesUrl}/${id}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    let errorMessage = 'Une erreur est survenue.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      errorMessage = `Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
