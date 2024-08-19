import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SousDomaine } from '../Models/SousDomaine.model';

@Injectable({
  providedIn: 'root'
})
export class SousDomaineService {
  private apiUrl = 'http://127.0.0.1:8000/api/sousdomaines';

  constructor(private http: HttpClient) {}

  getSousDomaines(): Observable<SousDomaine[]> {
    return this.http.get<SousDomaine[]>(this.apiUrl);
  }

  getSousDomaine(id: number): Observable<SousDomaine> {
    return this.http.get<SousDomaine>(`${this.apiUrl}/${id}`);
  }

  createSousDomaine(sousDomaine: SousDomaine): Observable<SousDomaine> {
    return this.http.post<SousDomaine>(this.apiUrl, sousDomaine);
  }

  updateSousDomaine(id: number, sousDomaine: SousDomaine): Observable<SousDomaine> {
    return this.http.put<SousDomaine>(`${this.apiUrl}/${id}`, sousDomaine);
  }

  deleteSousDomaine(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
