import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../Services/auth.service';

@Component({
  selector: 'app-navbar-entrepreneur',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar-entrepreneur.component.html',
  styleUrl: './navbar-entrepreneur.component.css'
})
export class NavbarEntrepreneurComponent {
  user: any;
  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    this.user = userString? JSON.parse(userString) : { username: '', roles: [] };

  }

  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout().subscribe(
      (response: any) => {
        console.log('Déconnexion réussie:', response);

        // Supprimer les données de l'utilisateur et le token du localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');

        // Rediriger vers la page de connexion après la déconnexion
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Erreur lors de la déconnexion:', error);
      }
    );
  }
}
