import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importer FormsModule
import { CommonModule } from '@angular/common';

interface Temoignage {
  titre: string;
  description: string;
}

@Component({
  selector: 'app-guide-completed',
  templateUrl: './guide-completed.component.html',
  styleUrls: ['./guide-completed.component.css'],
  standalone: true,  // Composant autonome
  imports: [CommonModule, FormsModule]  // Ajouter FormsModule ici
})
export class GuideCompletedComponent {
  temoignage: Temoignage = { titre: '', description: '' };
  temoignages: Temoignage[] = [];

  submitTemoignage() {
    if (this.temoignage.titre && this.temoignage.description) {
      this.temoignages.push({ ...this.temoignage });
      this.temoignage = { titre: '', description: '' }; // Réinitialiser le formulaire
    }
  }
}
