import { Component  } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../layouts/navbar/navbar.component';
import { SuperAdminLayoutComponent } from '../layouts/super-admin-layout/super-admin-layout.component';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule, NavbarComponent, SuperAdminLayoutComponent],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css'
})
export class DashboardAdminComponent {
  // nom utilisateur qui a connect et son role
  user: any;
  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    this.user = userString? JSON.parse(userString) : { username: '', roles: [] };
  }

  constructor(private authService: AuthService, private router: Router) {}
  // Method to logout
  logout() {
    this.authService.logout().subscribe(
      (response: any) => {
        console.log('Déconnexion réussie:', response);
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
      },
      (error: any) => {
        console.error('Erreur lors de la déconnexion:', error);
      }
    );
  }
}


