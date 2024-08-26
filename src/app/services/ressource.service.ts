import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
    return this.http.get<Ressource[]>(`${this.ressourcesUrl}?guideId=${guideId}`, { headers: this.getHttpHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  getRessources(): Observable<Ressource[]> {
    return this.http.get<Ressource[]>(this.ressourcesUrl, { headers: this.getHttpHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  getGuides(): Observable<Guide[]> {
    return this.http.get<Guide[]>(this.guidesUrl, { headers: this.getHttpHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  addRessource(ressource: Ressource): Observable<Ressource> {
    return this.http.post<Ressource>(this.ressourcesUrl, ressource, { headers: this.getHttpHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  updateRessource(id: number, ressource: Ressource): Observable<Ressource> {
    return this.http.put<Ressource>(`${this.ressourcesUrl}/${id}`, ressource, { headers: this.getHttpHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  deleteRessource(id: number): Observable<void> {
    return this.http.delete<void>(`${this.ressourcesUrl}/${id}`, { headers: this.getHttpHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
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
