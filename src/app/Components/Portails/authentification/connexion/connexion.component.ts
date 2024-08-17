import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserModel } from '../../../../Models/users.model';
import { AuthService } from '../../../../Services/auth.service';
import { Role } from '../../../../Models/roles.model';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})
export class ConnexionComponent {
  private authService = inject(AuthService);
  private router =inject(Router);


  // Declaration des variables
  userObject :UserModel = {};

  email: string = '';
  password: string = '';


  login() {
    if (this.userObject.email && this.userObject.password) {
      this.authService.login(this.userObject).subscribe(
        (response: any) => {
          console.log(response.access_token);
          console.log(response.user);

          if (response.user) {
            localStorage.setItem('access_token', response.access_token);
            localStorage.setItem('user', JSON.stringify(response.user));
            console.log(localStorage.getItem('user'));
            // si role = 'admin' ->dashboard/admin ou role = 'super_admin ->dashboard/super-admin ou role = 'entrepreneur ->dashboard/entrepreneur

            if (response.user.roles) {
              if (response.user.roles.some((role: Role) => role.name === 'admin')) {
                this.router.navigateByUrl('dashboard/admin');
              }
              else if (response.user.roles.some((role: Role) => role.name ==='super_admin')) {
                this.router.navigateByUrl('dashboard/super-admin');
              }
              else if (response.user.roles.some((role: Role) => role.name === 'entrepreneur')) {
                this.router.navigateByUrl('dashboard/entrepreneur');
              }
            }
            else {
              this.router.navigateByUrl('dashboard');
            }
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  // Fonction pour deconnexion
  // logout() {
  //   localStorage.removeItem('access_token');
  //   localStorage.removeItem('user');
  //   this.router.navigateByUrl('login');
  // }gout


  logout() {
    return this.authService.logout().subscribe(
      (response: any) => {
        console.log(response);
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Erreur lors de la déconnexion:', error);
      }
    );







}
}
