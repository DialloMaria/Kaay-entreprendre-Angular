import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Forum } from './../forum.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  private apiUrl = 'http://127.0.0.1:8000/api/forums';

  constructor(private http: HttpClient) {}

  getForums(): Observable<Forum[]> {
    return this.http.get<{ message: string; data: Forum[] }>(this.apiUrl).pipe(
      map(response => response.data) 
    );
  }
}
  