import { Component, OnInit } from '@angular/core';
import { GuideService } from '../../../../Services/guide.service';
import { Guide } from '../../../../models/guide.model';
import { CommonModule } from '@angular/common';
import { RessourceListComponent } from '../../Ressources/ressource-list/ressource-list.component';
import { Ressource } from '../../../../models/ressource.model';
import { RessourceService } from '../../../../Services/ressource.service';

@Component({
  selector: 'app-guide-list',
  templateUrl: './guide-list.component.html',
  styleUrls: ['./guide-list.component.css'],
  standalone: true,
  imports: [CommonModule, RessourceListComponent]
})
export class GuideListComponent implements OnInit {
  guides: Guide[] = [];
  selectedGuideId: number | null = null;
  filteredRessources: Ressource[] = [];

  constructor(
    private guideService: GuideService,
    private ressourceService: RessourceService
  ) {}

  ngOnInit(): void {
    this.loadGuides();
  }

  private loadGuides(): void {
    this.guideService.getGuides().subscribe({
      next: (guides: Guide[]) => {
        this.guides = guides;
        console.log('Guides:', this.guides);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des guides:', error.message);
      }
    });
  }
  onGuideSelected(guideId: number): void {
    this.selectedGuideId = guideId;
    this.ressourceService.getRessourcesByGuide(guideId).subscribe(
      (ressources: Ressource[]) => { // Fonction de rappel pour 'next'
        this.filteredRessources = ressources;
        console.log('Ressources:', this.filteredRessources);
      },

    );
  }

}
