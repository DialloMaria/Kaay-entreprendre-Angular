import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Guide } from '../models/guide.model';
import { Ressource } from '../models/ressource.model';

@Injectable({
  providedIn: 'root'
})
export class GuideService {

  private guidesUrl = 'http://127.0.0.1:8000/api/guides';
  private ressourcesUrl = 'http://127.0.0.1:8000/api/ressources';

  constructor(private http: HttpClient) { }

  private getHttpHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  getGuides(): Observable<Guide[]> {
    return this.http.get<Guide[]>(this.guidesUrl, { headers: this.getHttpHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  getRessourcesForGuide(guideId: number): Observable<Ressource[]> {
    return this.http.get<Ressource[]>(`${this.ressourcesUrl}?guide_id=${guideId}`, { headers: this.getHttpHeaders() }).pipe(
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
