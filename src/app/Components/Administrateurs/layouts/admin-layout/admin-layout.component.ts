import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [ NavbarComponent, CommonModule],

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
}
