import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Guide } from '../models/guide.model';

@Injectable({
  providedIn: 'root'
})
export class GuideService {
  private baseUrl = 'https://ton_api_laravel_url/api/guides';  // URL de ton API

  constructor(private http: HttpClient) {}

  getGuides(): Observable<Guide[]> {
    return this.http.get<Guide[]>(this.baseUrl);
  }

  getGuideById(id: number): Observable<Guide> {
    return this.http.get<Guide>(`${this.baseUrl}/${id}`);
  }

  createGuide(data: Guide): Observable<Guide> {
    return this.http.post<Guide>(this.baseUrl, data);
  }

  updateGuide(id: number, data: Guide): Observable<Guide> {
    return this.http.put<Guide>(`${this.baseUrl}/${id}`, data);
  }

  deleteGuide(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
