import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { sousdomaine } from '../../../Models/sousdomaines.model';
import { SousdomaineService } from '../../../Services/sousdomaine.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sous-domaine',
  standalone: true,
  imports: [CommonModule],
  providers: [SousdomaineService],
  templateUrl: './sous-domaine.component.html',
  styleUrls: ['./sous-domaine.component.css']
})
export class SousDomaineComponent implements OnChanges {

  @Input() domaineId!: number;
  sousDomaines: sousdomaine[] = [];
  inscriptionMessage: string | null = null;
  inscriptionError: string | null = null;

  constructor(private sousDomaineService: SousdomaineService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['domaineId'] && this.domaineId) {
      this.sousDomaineService.getsousdomainesByDomaine(this.domaineId).subscribe(
        (data: sousdomaine[]) => {
          console.log('Sous-domaines:', data); // Debug: Afficher les sous-domaines
          this.sousDomaines = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération des sous-domaines', error);
        }
      );
    }
  }

  inscrireSousDomaine(sousDomaineId: number): void {
    if (typeof sousDomaineId === 'number') { // Vérifier que l'ID est bien un nombre
      this.sousDomaineService.inscrireUtilisateur(sousDomaineId).subscribe(
        response => {
          this.inscriptionMessage = 'Inscription réussie.';
          console.log('Inscription réussie:', response);
        },
        error => {
          if (error.status === 400) {
            this.inscriptionError = 'Vous êtes déjà inscrit à ce sous-domaine.';
          } else {
            this.inscriptionError = 'Une erreur est survenue lors de l\'inscription.';
          }
          console.error('Erreur lors de l\'inscription:', error);
        }
      );
    } else {
      console.error('ID de sous-domaine invalide:', sousDomaineId);
    }
  }
}
