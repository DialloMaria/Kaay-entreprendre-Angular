import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = 'http://votre-api-url/messages'; 

  constructor(private http: HttpClient) {}

  // Méthode pour obtenir les messages d'un forum spécifique
  getMessages(forumId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?forumId=${forumId}`);
  }

  // Méthode pour envoyer un nouveau message
  sendMessage(message: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, message);
  }
}
