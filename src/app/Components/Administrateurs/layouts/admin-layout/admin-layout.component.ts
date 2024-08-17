import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {

  // Utilisation d'AfterViewInit pour s'assurer que le DOM est prêt
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
