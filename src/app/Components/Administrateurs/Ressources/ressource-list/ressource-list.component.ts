import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RessourceService } from '../../../../services/ressource.service';
import { GuideService } from '../../../../services/guide.service'; // Import the GuideService
import { Guide } from '../../../../models/guide.model';
import { Ressource } from '../../../../models/ressource.model';
import { GuideListComponent } from '../../Guides/guide-list/guide-list.component';
import { HttpErrorResponse } from '@angular/common/http';

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
  selectedGuideId: number | null = null;
  activeAccordionId: number | null = null;
  guides: Guide[] = [];

  constructor(private ressourceService: RessourceService, private guideService: GuideService) { }

  ngOnInit(): void {
    this.loadGuides();
  }

  private loadGuides(): void {
    this.guideService.getGuides().subscribe(
      (guides: Guide[]) => {
        this.guides = guides;
      },
      (error: HttpErrorResponse) => {
        console.error('Erreur lors du chargement des guides:', error.message);
      }
    );
  }

  private loadRessources(): void {
    if (this.selectedGuideId) {
      this.ressourceService.getRessourcesByGuideId(this.selectedGuideId).subscribe(
        (response: any) => {
          this.ressources = response.data || [];
          this.filteredRessources = this.ressources;
        },
        (error: HttpErrorResponse) => {
          console.error('Erreur lors du chargement des ressources:', error.message);
        }
      );
    }
  }

  onGuideSelected(guideId: number): void {
    this.selectedGuideId = guideId;
    this.loadRessources();
  }

  toggleAccordion(id: number): void {
    this.activeAccordionId = this.activeAccordionId === id ? null : id;
  }

  isActive(id: number): boolean {
    return this.activeAccordionId === id;
  }
}
