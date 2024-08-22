import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuideService } from '../../../../Services/guide.service';
import { GuideModel } from '../../../../Models/guides.model';
import { FormsModule } from '@angular/forms';
import { SousDomaineService } from '../../../../Services/sous-domaine.service';
import { SousDomaineModel } from '../../../../Models/sous-domaines.model';
import { DomaineService } from '../../../../Services/domaine.service';

@Component({
  selector: 'app-guide-dash',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './guide-list.component.html',
  styleUrls: ['./guide-list.component.css']
})
export class GuideListComponent implements OnInit {
  guides: GuideModel[] = [];
  selectedGuide?: GuideModel;
  showCreateForm = false;
  newGuide: GuideModel = {};
  isFormVisible = false;
  image = '';
  imageGuide = '';
  messageImage = 'Aucune image pour ce guide';
  domaines: any[] = [];
  sousDomaines: SousDomaineModel[] = [];
  etapeErrorMessage?: string;
  errorMessage?: string;
  domaine_id: number | null = null;
  sous_domaine_id: number | null = null;

  constructor(
    private guideService: GuideService,
    private sousDomaineService: SousDomaineService,
    private domaineService: DomaineService
  ) {}

  ngOnInit(): void {
    this.loadDomaines();
    this.getSousDomaines();
  }

  getSousDomaines(): void {
    this.sousDomaineService.getSousDomaines().subscribe({
      next: (response: any) => {
        this.sousDomaines = response.data || response;
        this.getGuides();
      },
      error: (error) => console.error('Failed to fetch sous-domaines:', error)
    });
  }

  getGuides(): void {
    this.guideService.getGuides().subscribe({
      next: (response: any) => {
        this.guides = response.data || response;
        this.guides = this.guides.map((guide: GuideModel) => {
          const sousDomaine = this.sousDomaines.find(sd => sd.id === guide.domaine_id);
          return {
            ...guide,
            media: guide.media ? `http://127.0.0.1:8000/storage/${guide.media}` : 'https://via.placeholder.com/297x110',
            sous_domaine_nom: sousDomaine ? sousDomaine.nom : 'Sous-domaine inconnu',
          };
        });
      },
      error: (error) => console.error('Failed to fetch guides:', error)
    });
  }



  onDomaineChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const domaineId = parseInt(target.value, 10);

    if (!isNaN(domaineId)) {
      this.domaineService.getSousDomaines(domaineId).subscribe({
        next: (response) => {
          this.sousDomaines = response;
        },
        error: (error) => console.error('Erreur lors du chargement des sous-domaines', error)
      });
    }
  }

  openDetailPopup(guide: GuideModel): void {
    this.selectedGuide = { ...guide };
  }

  openPopup(): void {
    this.isFormVisible = true;
  }

  closePopup(): void {
    this.isFormVisible = false;
    this.selectedGuide = undefined;
    this.newGuide = {};
  }

  saveGuideDetails(): void {
    const guideToSave = this.selectedGuide || this.newGuide;
    const formData = new FormData();
    formData.append('titre', guideToSave.titre || '');
    formData.append('contenu', guideToSave.contenu || '');
    formData.append('datepublication', guideToSave.datePublication || '');
    formData.append('etape', guideToSave.etape?.toString() || '');
    formData.append('domaine_id', guideToSave.domaine_id?.toString() || '');

    if (guideToSave.media) {
      formData.append('media', guideToSave.media);
    }

    if (this.selectedGuide && this.selectedGuide.id !== undefined) {
      this.guideService.updateGuide(this.selectedGuide.id, formData).subscribe({
        next: () => {
          const index = this.guides.findIndex(g => g.id === this.selectedGuide?.id);
          if (index !== -1) {
            this.guides[index] = { ...this.selectedGuide };
          }
          this.closePopup();
        },
        error: (error) => this.handleError(error)
      });
    } else {
      this.createGuide();
    }
  }

  deleteGuide(): void {
    if (this.selectedGuide?.id) {
      this.guideService.deleteGuide(this.selectedGuide.id).subscribe({
        next: () => {
          this.guides = this.guides.filter(g => g.id !== this.selectedGuide?.id);
          this.closePopup();
        },
        error: (error) => console.error('Failed to delete guide:', error)
      });
    }
  }

  openCreateForm(): void {
    this.showCreateForm = true;
  }

  closeCreateForm(): void {
    this.showCreateForm = false;
    this.newGuide = {};
  }

  createGuide(): void {
    const formData = new FormData();
    formData.append('titre', this.newGuide.titre || '');
    formData.append('contenu', this.newGuide.contenu || '');
    formData.append('datepublication', this.newGuide.datePublication || '');
    formData.append('etape', this.newGuide.etape?.toString() || '');
    formData.append('domaine_id', this.newGuide.domaine_id?.toString() || '');
    if (this.newGuide.media) {
      formData.append('media', this.newGuide.media);
    }

    this.guideService.createGuide(formData).subscribe({
      next: (response) => {
        console.log('Guide créé avec succès', response);
        this.closePopup();
        this.getGuides();
      },
      error: (error) => this.handleError(error)
    });
  }

  onEtapeChange(): void {
    this.etapeErrorMessage = '';
  }

  loadDomaines(): void {
    this.domaineService.getDomaines().subscribe({
      next: (response) => {
        this.domaines = response;
      },
      error: (error) => console.error('Erreur lors du chargement des domaines', error)
    });
  }


  onMediaChange(event: any): void {
    const file = event.target.files[0];
    this.newGuide.media = file ? file : undefined;
  }

  private handleError(error: any): void {
    console.error('Erreur lors de l\'opération', error);
    if (error.status === 422 && error.error.errors) {

      const validationErrors = error.error.errors;
      if (validationErrors.etape) {
        this.etapeErrorMessage = 'Cette étape existe déjà pour ce domaine.';
      }
      this.errorMessage = 'Une erreur est survenue lors de la création ou de la mise à jour du guide.';
    } else {
      this.errorMessage = 'Une erreur inattendue est survenue.';
    }
  }
}
