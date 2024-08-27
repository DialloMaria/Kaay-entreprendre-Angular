import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Temoignage } from '../Models/temoignages.model';
import { map } from 'rxjs/operators';
import { apiUrl } from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class TemoignagesService {
  constructor(private http: HttpClient) {}

  getTemoignages(): Observable<Temoignage[]> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<{ data: Temoignage[] }>(`${apiUrl}/temoignages`, { headers }).pipe(
      map(response => response.data)
    );
  }

  createTemoignage(temoignage: Temoignage): Observable<Temoignage> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<Temoignage>(`${apiUrl}/temoignages`, temoignage, { headers });
  }

  updateTemoignage(id: number, updatedData: Partial<Temoignage>): Observable<Temoignage> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.put<Temoignage>(`${apiUrl}/temoignages/${id}`, updatedData, { headers });
  }

  deleteTemoignage(id: number): Observable<void> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete<void>(`${apiUrl}/temoignages/${id}`, { headers });
  }
}
