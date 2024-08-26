import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = 'http://127.0.0.1:8000/api/messages'; 

  constructor(private http: HttpClient) {}

  getMessages(forumId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?forumId=${forumId}`);
  }

  sendMessage(message: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, message);
  }
}
