// src/app/categories/Categorie.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categorie } from '../Models/categories.model';
import { apiUrl } from "./apiUrl";
import { Domaine } from '../Models/domaine.model';


@Injectable({
  providedIn: 'root'
})
export class CategoriService  {
// constructor(private http: HttpClient) {}
private http = inject(HttpClient);
@Injectable({
  providedIn: 'root'
})

  getCategories() {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${apiUrl}/categories`, { headers });

  }

  getStats() {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${apiUrl}/dashboard/super-admin`, { headers });
  }


  getCategorie(id: number): Observable<Categorie> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Categorie>(`${apiUrl}/categories/${id}`, { headers });
  }

  createCategorie(categorie: Categorie): Observable<Categorie> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<Categorie>(`${apiUrl}/categories`, categorie, { headers });

  }

  updateCategorie(id: number, categorie: Categorie): Observable<Categorie> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<Categorie>(`${apiUrl}/categories/${id}`, categorie, { headers });
  }

  deleteCategorie(id: number): Observable<Categorie> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete<Categorie>(`${apiUrl}/categories/${id}`, { headers });

  }
  
}

  // Méthode pour obtenir les statistiques
