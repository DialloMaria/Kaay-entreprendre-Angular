import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { apiUrl } from "./apiUrl";


@Injectable ({
  providedIn: 'root'

})

export class SuperAdminService{
  getSousDomaines(domaineId: number) {
    throw new Error('Method not implemented.');
  }
  // constructor(private http: HttpClient) {}
  private http = inject(HttpClient);
  @Injectable({
    providedIn: 'root'
  })


  // Decaration des methods

  // Méthode pour obtenir les statistiques
   getStats() {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${apiUrl}/dashboard/super-admin`, { headers });
  }
  // Méthode pour obtenir la liste des categories
  getCategories() {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${apiUrl}/categories`, { headers });
  }

  //   // Méthode pour obtenir la details d'un categorie
  getCategoryById(id: number) {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${apiUrl}/categories/${id}`, { headers });
  }

  loadSousDomaines(id: number){
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${apiUrl}/domaines/${id}/sous-domaines`, { headers });

  }

  //       this.http.get(`http://127.0.0.1:8000/api/domaines/${domaineId}/sous-domaines`).subscribe((response: any) => {

  //     this.selectedSousDomaines = response.sousDomaines;








//   login(email: string, password: string): Observable<any> {







//   // isAuthenticated(): boolean {
//   //   // TODO: implement authentication logic
//   //   return true;
//   // }
// }
}
