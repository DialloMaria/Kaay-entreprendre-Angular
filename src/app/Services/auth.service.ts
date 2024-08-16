import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { apiUrl } from "./apiUrl";
import { Observable } from "rxjs";
import { DomaineModel } from "../Models/domaines.model";

@Injectable ({
  providedIn: 'root'

})

export class AuthService{
  // constructor(private http: HttpClient) {}
  private http = inject(HttpClient);
  @Injectable({
    providedIn: 'root'
  })

  // Decaration des methods

    // method to login
  login(identifiant: any)  {
    return this.http.post(`${apiUrl}/login`, identifiant)
  }

  // method to register
  register(identifiant: any) {
    return this.http.post(`${apiUrl}/register`, identifiant)
  }

  registerAdmin(identifiant: any) {
    return this.http.post(`${apiUrl}/register/admin`, identifiant)
  }

  //  // Méthode pour récupérer les domaines
  //  getSpecialisations(): Observable<string[]> {
  //   return this.http.get<string[]>(`${apiUrl}/domaines`);
  // }

  // ngOnInit(): void {
  //   this.authService.getSpecialisations().subscribe(
  //     (data: DomaineModel[]) => {
  //       console.log('Domaines chargés:', data);
  //       this.domaines = data;
  //     },
  //     (error) => {
  //       console.error('Erreur lors du chargement des domaines:', error);
  //     }
  //   );
  // }

  getSpecialisations(): Observable<DomaineModel[]> {
    return this.http.get<DomaineModel[]>(`${apiUrl}/domaines`);
  }


  // method to logout
  logout() {
    return this.http.get(`${apiUrl}/logout`);
  }







//   login(email: string, password: string): Observable<any> {







//   // isAuthenticated(): boolean {
//   //   // TODO: implement authentication logic
//   //   return true;
//   // }
// }
}
