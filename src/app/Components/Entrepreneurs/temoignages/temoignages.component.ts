import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Ajout pour les formulaires
import { Temoignage } from '../../../Models/temoignages.model';
import { TemoignagesService } from '../../../Services/temoignages.service';

@Component({
  selector: 'app-temoignages',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Ajout de FormsModule pour les formulaires
  templateUrl: './temoignages.component.html',
  styleUrls: ['./temoignages.component.css']
})
export class TemoignagesComponent implements OnInit {
  temoignages: Temoignage[] = [];
  selectedTemoignage: Temoignage | null = null;
  newTitre: string = '';
  newDescription: string = '';
  guide_id: number = 1;  // Valeur par défaut pour l'exemple

  constructor(private temoignageService: TemoignagesService) {}

  ngOnInit(): void {
    this.loadTemoignages();
  }

  loadTemoignages(): void {
    this.temoignageService.getTemoignages().subscribe(
      (data: Temoignage[]) => this.temoignages = data,
      error => console.error('Erreur lors du chargement des témoignages', error)
    );
  }

  editTemoignage(temoignage: Temoignage): void {
    this.selectedTemoignage = { ...temoignage };  // Créer une copie pour l'édition
    this.newTitre = temoignage.titre;  // Remplir le formulaire d'édition
    this.newDescription = temoignage.description;
  }

  updateTemoignage(): void {
    if (this.selectedTemoignage) {
      this.selectedTemoignage.titre = this.newTitre;
      this.selectedTemoignage.description = this.newDescription;
      this.temoignageService.updateTemoignage(this.selectedTemoignage.id!, this.selectedTemoignage).subscribe(
        () => {
          this.loadTemoignages();
          this.selectedTemoignage = null; // Réinitialiser après la mise à jour
          this.newTitre = ''; // Réinitialiser le titre pour la création
          this.newDescription = ''; // Réinitialiser la description pour la création
        },
        error => console.error('Erreur lors de la mise à jour du témoignage', error)
      );
    }
  }

  deleteTemoignage(id: number): void {
    this.temoignageService.deleteTemoignage(id).subscribe(
      () => this.loadTemoignages(),
      error => console.error('Erreur lors de la suppression du témoignage', error)
    );
  }

  createTemoignage(): void {
    if (this.newTitre && this.newDescription) {
      const newTemoignage: Temoignage = { titre: this.newTitre, description: this.newDescription, guide_id: this.guide_id };
      this.temoignageService.createTemoignage(newTemoignage).subscribe(
        () => {
          this.loadTemoignages();
          this.newTitre = '';
          this.newDescription = '';
          this.selectedTemoignage = null; // Réinitialiser la sélection après la création
        },
        error => console.error('Erreur lors de la création du témoignage', error)
      );
    }
  }

  cancelEdit(): void {
    this.selectedTemoignage = null; // Annuler l'édition et réinitialiser le formulaire
    this.newTitre = '';
    this.newDescription = '';
  }
}
