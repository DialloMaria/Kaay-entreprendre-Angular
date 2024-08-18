import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { apiUrl } from "./apiUrl";


@Injectable ({
  providedIn: 'root'

})

export class SuperAdminService{
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






//   login(email: string, password: string): Observable<any> {







//   // isAuthenticated(): boolean {
//   //   // TODO: implement authentication logic
//   //   return true;
//   // }
// }
}
