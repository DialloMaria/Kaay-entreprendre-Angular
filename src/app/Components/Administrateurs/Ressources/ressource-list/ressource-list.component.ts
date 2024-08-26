import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Guide } from '../../../../models/guide.model';
import { Ressource } from '../../../../models/ressource.model';
import { GuideService } from '../../../../Services/guide.service';
import { RessourceService } from '../../../../services/ressource.service';
import { DomaineService } from '../../../../Services/domaine.service';

@Component({
  selector: 'app-ressource-list',
  standalone: true,
  templateUrl: './ressource-list.component.html',
  styleUrls: ['./ressource-list.component.css'],
  imports: [CommonModule, FormsModule]
})
export class RessourceListComponent implements OnInit {
  guidesByStep: { [key: number]: Guide[] } = {};
  filteredRessources: Ressource[] = [];
  activeRessourceId: number | null = null;
  allRessources: Ressource[] = [];
  domaines: { id: number; guides: Guide[] }[] = [];
  selectedGuideId: number | null = null;

  constructor(
    private guideService: GuideService,
    private ressourceService: RessourceService,
    private domaineService: DomaineService
  ) {}

  ngOnInit(): void {
    // Charger les guides et ressources depuis les services
    this.guideService.getGuides().subscribe({
      next: (guides: Guide[]) => {
        this.guidesByStep = this.groupGuidesByStep(guides);
        console.log('Guides by step:', this.guidesByStep);
      },
      error: (error) => console.error('Erreur lors du chargement des guides:', error)
    });

    this.ressourceService.getRessources().subscribe({
      next: (ressources: Ressource[]) => {
        this.allRessources = ressources;
        console.log('All ressources:', this.allRessources);
      },
      error: (error) => console.error('Erreur lors du chargement des ressources:', error)
    });

    this.loadDomaines(); // Assurez-vous de charger les domaines également
  }

  loadDomaines(): void {
    this.domaineService.getDomaines().subscribe({
      next: (response: any) => {
        // Transformation des données reçues
        const transformedDomaines = Object.keys(response).map(key => ({
          id: Number(key),
          guides: response[key] || []
        }));

        this.domaines = transformedDomaines;
        console.log('Domaines:', this.domaines); // Vérification des données transformées
      },
      error: (error) => console.error('Erreur lors du chargement des domaines:', error)
    });
  }

  groupGuidesByStep(guides: Guide[]): { [key: number]: Guide[] } {
    return guides.reduce((result: { [key: number]: Guide[] }, guide) => {
      if (!result[guide.etape]) {
        result[guide.etape] = [];
      }
      result[guide.etape].push(guide);
      return result;
    }, {});
  }

  getSteps(): number[] {
    return Object.keys(this.guidesByStep).map(key => Number(key));
  }

  selectGuide(guideId: number): void {
    if (this.allRessources && Array.isArray(this.allRessources)) {
      this.filteredRessources = this.allRessources.filter((ressource) => ressource.guide_id === guideId);
    } else {
      console.error('Erreur: allRessources n\'est pas un tableau.');
    }
  }

  toggleAccordion(ressourceId: number): void {
    this.activeRessourceId = this.activeRessourceId === ressourceId ? null : ressourceId;
  }

  isActive(ressourceId: number): boolean {
    return this.activeRessourceId === ressourceId;
  }
  
}
