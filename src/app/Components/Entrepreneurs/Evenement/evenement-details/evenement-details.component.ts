import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EvenementModel } from '../../../../Models/evenements.model';
import { EvenementService } from '../../../../Services/evenement.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-evenement-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './evenement-details.component.html',
  styleUrl: './evenement-details.component.css'
})
export class EvenementDetailsComponent implements OnInit {
  evenement: EvenementModel| undefined;

  constructor(
    private route: ActivatedRoute,
    private evenementService: EvenementService
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
}
