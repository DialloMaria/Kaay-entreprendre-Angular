import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { CommentairesGuidesList } from '../Models/commentaires-guides-list';
import { apiUrl } from './apiUrl'; // Assurez-vous que ce fichier contient la constante 'apiUrl'

@Injectable({
  providedIn: 'root'
})
export class CommentairesGuidesListService {

  constructor(private http: HttpClient) { }

  getCommentaires(): Observable<CommentairesGuidesList[]> {
    return this.http.get<CommentairesGuidesList[]>(`${apiUrl}/commentaires`).pipe(
      catchError(this.handleError)
    );
  }

  createCommentaire(commentaire: CommentairesGuidesList): Observable<CommentairesGuidesList> {
    return this.http.post<CommentairesGuidesList>(`${apiUrl}/commentaires`, commentaire).pipe(
      catchError(this.handleError)
    );
  }

  updateCommentaire(id: number, commentaire: CommentairesGuidesList): Observable<CommentairesGuidesList> {
    return this.http.put<CommentairesGuidesList>(`${apiUrl}/commentaires/${id}`, commentaire).pipe(
      catchError(this.handleError)
    );
  }

  deleteCommentaire(id: number): Observable<void> {
    return this.http.delete<void>(`${apiUrl}/commentaires/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }
}
