import { Component } from '@angular/core';
import { SuperAdminLayoutComponent } from "../super-admin-layout/super-admin-layout.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [SuperAdminLayoutComponent, NavbarComponent, CommonModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {

  user: any;
  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    this.user = userString? JSON.parse(userString) : { username: '', roles: [] };
  }

  ngAfterViewInit() {
    this.activeMenu();
  }
  constructor(private authService: AuthService, private router: Router) {}


  activeMenu() {
    // Sélectionne tous les liens de navigation
    const navLinks = document.querySelectorAll('nav a');

    // Ajoute l'écouteur d'événement pour chaque lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Supprime la classe active de tous les liens
            navLinks.forEach(navLink => navLink.classList.remove('bg-green-700', 'text-white'));

            // Ajoute la classe active au lien cliqué
            link.classList.add('bg-green-700', 'text-white');
            link.classList.remove('text-green-700');
        });
    });
  }
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
