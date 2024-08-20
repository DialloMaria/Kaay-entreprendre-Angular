// src/app/Components/Administrateurs/Ressources/ressource-list/ressource-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RessourceService } from '../../../../services/ressource.service';
import { Guide } from '../../../../models/guide.model'; // Assurez-vous que le chemin est correct
import { Ressource } from '../../../../models/ressource.model'; // Assurez-vous que le chemin est correct
import { HttpErrorResponse } from '@angular/common/http';
import { GuideListComponent } from '../../Guides/guide-list/guide-list.component';

@Component({
  selector: 'app-ressource-list',
  standalone: true,
  templateUrl: './ressource-list.component.html',
  styleUrls: ['./ressource-list.component.css'],
  imports: [CommonModule, FormsModule, GuideListComponent]
})
export class RessourceListComponent implements OnInit {
  ressources: Ressource[] = [];
  filteredRessources: Ressource[] = [];
  guides: Guide[] = [];
  selectedGuideId: number | null = null;

  constructor(private ressourceService: RessourceService) {}

  ngOnInit(): void {
    this.loadGuides(); // Charge les guides qui contiennent leurs ressources
  }

  private loadGuides(): void {
    this.ressourceService.getGuides().subscribe(
      (response: Guide[]) => {
        this.guides = response;
      },
      (error: HttpErrorResponse) => {
        console.error('Erreur lors du chargement des guides:', error.message);
      }
    );
  }

  onGuideSelected(guideId: number): void {
    this.selectedGuideId = guideId;
    this.ressourceService.getRessourcesByGuideId(guideId).subscribe(
      (response: Ressource[]) => {
        this.filteredRessources = response;
      },
      (error: HttpErrorResponse) => {
        console.error('Erreur lors du chargement des ressources:', error.message);
      }
    );
  }
}
