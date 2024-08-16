import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserModel } from '../../../../Models/users.model';
import { AuthService } from '../../../../Services/auth.service';

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



  // Declaeation des methods
  login() {
    if (this.userObject.email && this.userObject.password) {
    this.authService.login(this.userObject).subscribe(
      (response: any) => {
        console.log(response.access_token);
        console.log(response.user);


        // si reponse user
        if (response.user) {

        // Sauvegarde du token dans le local storage
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('user', JSON.stringify(response.user));
        // si est role admin
          // Redirection vers la page d'accueil admin
          // window.location.href = '/livre';
          this.router.navigateByUrl('dashboard');

        // else {
        //   // Redirection vers la page d'accueil acc
        //   // window.location.href = '/accuile';
        //   this.router.navigateByUrl('/accuile');
        // }

        }
      },
      (error) => {
        console.error(error);
      }

    );
  }

}
}
