import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Domaine } from '../Models/domaine.model';
import { apiUrl } from "./apiUrl";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DomaineService {

// constructor(private http: HttpClient) {}
private http = inject(HttpClient);
@Injectable({
  providedIn: 'root'
})
getDomainesByCategorie(categorieId: number): Observable<Domaine[]> {
  const token = localStorage.getItem('access_token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  // Construction de l'URL avec `apiUrl`
  return this.http.get<{ message: string; data: Domaine[] }>(`${apiUrl}/domainescategorie/${categorieId}`, { headers })
    .pipe(
      map(response => response.data)  // Extraire le tableau des données
    );
}



InscritgetDomaines(): Observable<Domaine[]> {
  const token = localStorage.getItem('access_token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  return this.http.get<any>(`${apiUrl}/domaines`, { headers }).pipe(
    map(response => {
      console.log('Réponse API:', response); // Inspecter la réponse
      return Array.isArray(response) ? response : [];
    })
  );
}

  // Obtenir la liste des domaines
  getDomaines(): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${apiUrl}/domaines`, { headers });
  }

  // Obtenir les sous-domaines pour un domaine spécifique
  getSousDomaines(domaineId: number): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${apiUrl}/domaines/${domaineId}/sous-domaines`, { headers });
  }

  // Obtenir les statistiques du tableau de bord
  getStats(): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${apiUrl}/dashboard/super-admin`, { headers });
  }

  // Obtenir un domaine spécifique
  getDomaine(id: number): Observable<Domaine> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Domaine>(`${apiUrl}/domaines/${id}`, { headers });
  }

  // Créer un nouveau domaine
  createDomaine(domaine: Domaine): Observable<Domaine> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<Domaine>(`${apiUrl}/domaines`, domaine, { headers });
  }

  // Mettre à jour un domaine existant
  updateDomaine(id: number, domaine: Domaine): Observable<Domaine> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<Domaine>(`${apiUrl}/domaines/${id}`, domaine, { headers });
  }

  // Supprimer un domaine
  deleteDomaine(id: number): Observable<Domaine> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<Domaine>(`${apiUrl}/domaines/${id}`, { headers });
  }

//incrire le user dans un domaine
  inscrireUtilisateur(sousDomaineId: number): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(`${apiUrl}/domaines/${sousDomaineId}/inscrire`, {}, { headers });
  }
}
