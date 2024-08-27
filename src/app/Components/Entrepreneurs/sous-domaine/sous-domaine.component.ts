import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { sousdomaine } from '../../../Models/sousdomaines.model';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { SousdomaineService } from '../../../Services/sousdomaine.service';


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
    if (typeof sousDomaineId === 'number') {
      Swal.fire({
        title: 'Êtes-vous sûr ?',
        text: "Vous vous apprêtez à vous inscrire à ce sous-domaine.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, confirmer',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.isConfirmed) {
          this.sousDomaineService.inscrireUtilisateur(sousDomaineId).subscribe(
            response => {
              Swal.fire(
                'Inscription réussie',
                'Vous avez été inscrit avec succès.',
                'success'
              );
              this.inscriptionMessage = 'Inscription réussie.';
              console.log('Inscription réussie:', response);
            },
            error => {
              if (error.status === 400) {
                Swal.fire(
                  'Erreur',
                  'Vous êtes déjà inscrit à ce sous-domaine.',
                  'error'
                );
                this.inscriptionError = 'Vous êtes déjà inscrit à ce sous-domaine.';
              } else {
                Swal.fire(
                  'Erreur',
                  'Une erreur est survenue lors de l\'inscription.',
                  'error'
                );
                this.inscriptionError = 'Une erreur est survenue lors de l\'inscription.';
              }
              console.error('Erreur lors de l\'inscription:', error);
            }
          );
        }
      });
    } else {
      console.error('ID de sous-domaine invalide:', sousDomaineId);
    }

}

}
