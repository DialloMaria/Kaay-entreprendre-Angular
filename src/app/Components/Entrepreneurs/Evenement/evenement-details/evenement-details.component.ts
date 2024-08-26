import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EvenementModel } from '../../../../Models/evenements.model';
import { EvenementService } from '../../../../Services/evenement.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-evenement-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './evenement-details.component.html',
  styleUrl: './evenement-details.component.css'
})
export class EvenementDetailsComponent implements OnInit {
  evenement: EvenementModel| undefined;

  constructor(
    private route: ActivatedRoute,
    private evenementService: EvenementService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id']; // + pour convertir en nombre
      this.getEvenement(id);
    });
  }

  getEvenement(id: number): void {
    this.evenementService.getEvenement(id).subscribe({
      next: (data) => this.evenement = data,
      error: (err) => console.error('Erreur lors de la récupération de l\'événement', err)
    });
  }
  registerForEvent(eventId: number) {
    Swal.fire({
      title: 'Confirmer l\'inscription',
      text: 'Êtes-vous sûr de vouloir vous inscrire à cet événement ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, s\'inscrire !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.evenementService.registerForEvent(eventId).subscribe(
          response => {
            Swal.fire(
              'Inscription réussie',
              'Vous êtes inscrit à cet événement.',
              'success'
            );
          },
          error => {
            Swal.fire(
              'Erreur',
              'Erreur: ' + error.error.message,
              'error'
            );
          }
        );
      }
    });
  }
}

