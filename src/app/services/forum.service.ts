import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  private apiUrl = 'http://votre-api-url/forums'; 

  constructor(private http: HttpClient) {}

  getForums(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getForum(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createForum(forum: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, forum);
  }

  updateForum(id: number, forum: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, forum);
  }

  deleteForum(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
