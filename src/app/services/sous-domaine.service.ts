import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SousDomaineService {

  private apiUrl = 'http://127.0.0.1:8000/api/sousdomaine';

  constructor(private http: HttpClient) { }

  // Méthode pour obtenir la liste de tous les sous-domaines
  getSousDomaine(){
  }

  // Méthode pour obtenir un sous-domaine spécifique par son ID


  // Méthode pour créer un nouveau sous-domaine
  createSousDomaine(){

}

  // Méthode pour mettre à jour un sous-domaine existant par son ID
  updateSousDomaine(){

}

  // Méthode pour supprimer un sous-domaine par son ID
  deleteSousDomaine(){

}

  // Méthode pour obtenir les statistiques (si applicable)
  getStats(): Observable<any> {
    // Récupération du token d'authentification depuis le stockage local
    const token = localStorage.getItem('access_token');
    // Création des en-têtes HTTP avec le token d'authentification
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Appel de l'API pour obtenir les statistiques avec les en-têtes d'authentification
    return this.http.get<any>(`${this.apiUrl}/dashboard/super-admin`, { headers });
  }

}
