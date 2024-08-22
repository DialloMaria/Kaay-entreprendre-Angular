import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuideService } from '../../../../Services/guide.service';
import { GuideModel } from '../../../../Models/guides.model';
import { FormsModule } from '@angular/forms';

import { SousDomaineService } from '../../../../Services/sous-domaine.service';
import { SousDomaineModel } from '../../../../Models/sous-domaines.model';





@Component({
  selector: 'app-guide-dash',
  standalone: true,
  imports: [CommonModule, FormsModule, ], // Add necessary Angular modules here
  templateUrl: './guide-list.component.html',
  styleUrls: ['./guide-list.component.css'] // Corrected styleUrls
})
export class GuideListComponent implements OnInit {

  guides: GuideModel[] = [];
  selectedGuide?: GuideModel | null = null;
  showCreateForm: boolean = false;
  newGuide: GuideModel = {};
  isFormVisible: boolean = false;
  image:string = "";
  imageGuide:string = "";
  messageImage: string = "Aucune image pour ce guide";
  domaines: any[] = [];
  domaineService: any;
  sousDomaines: SousDomaineModel[] = [] ;




  constructor(private guideService: GuideService,

    private sousDomaineService: SousDomaineService
  ) {}

  ngOnInit(): void {
    this.getGuides();
    this.getSousDomaines(); // Fetch subdomains first
  }

  getSousDomaines(): void {
    this.sousDomaineService.getSousDomaines().subscribe((response: any) => {
      this.sousDomaines = response.data || response; // Assuming the response contains an array of sous-domaines
      this.getGuides(); // Fetch guides only after sous-domaines are loaded
    }, error => {
      console.error('Failed to fetch sous-domaines:', error);
    });
  }

  getGuides(): void {
    this.guideService.getGuides().subscribe((response: any) => {
      this.guides = response.data || response;

      // Ensure sousDomaines is defined before using it
      if (this.sousDomaines) {
        this.guides = this.guides.map((guide: GuideModel) => {
          console.log(`http://127.0.0.1:8000/storage/${guide.media}`);

          const sousDomaine = this.sousDomaines.find(sd => sd.id === guide.domaine_id);
          console.log(`http://127.0.0.1:8000/storage/${guide.media}`);

          return {

            ...guide,
            media: guide.media ? `http://127.0.0.1:8000/storage/${guide.media}` : 'https://via.placeholder.com/297x110',
            sous_domaine_nom: sousDomaine ? sousDomaine.nom : 'Sous-domaine inconnu',  // Associate the subdomain name
          };
        });
      } else {
        console.error('Sous-domaines are undefined');
      }
    }, error => {
      console.error('Failed to fetch guides:', error);
    });
  }



  openDetailPopup(guide: GuideModel): void {
    this.selectedGuide = { ...guide }; // Clone the guide object to avoid direct mutation
  }

 // Méthode pour fermer le formulaire de création
openPopup(): void {
  this.isFormVisible = true;
}

closePopup(): void {
  this.isFormVisible = false;
  this.selectedGuide = null;
  this.newGuide = {};  // Reset both forms
}
saveGuideDetails(): void {
  const guideToSave = this.selectedGuide || this.newGuide;

  const formData = new FormData();
  formData.append('titre', guideToSave.titre || '');
  formData.append('contenu', guideToSave.contenu || '');
  formData.append('datepublication', guideToSave.datePublication || ''); // Ensure field name matches API
  formData.append('etape', guideToSave.etape?.toString() || '');
  formData.append('domaine_id', guideToSave.domaine_id?.toString() || '');

  if (guideToSave.media) {
    formData.append('media', guideToSave.media);
  }

  console.log('FormData content:');
  formData.forEach((value, key) => console.log(`${key}: ${value}`));

  if (this.selectedGuide && this.selectedGuide.id !== undefined) {
    this.guideService.updateGuide(this.selectedGuide.id, formData).subscribe({
      next: (response) => {
        const index = this.guides.findIndex(g => g.id === this.selectedGuide?.id);
        if (index !== -1) {
          this.guides[index] = { ...this.selectedGuide };
        }
        this.closePopup();
      },
      error: (error) => {
        console.error('Failed to update guide:', error);
      }
    });
  } else {
    this.createGuide(); // Reuse createGuide() to handle form submission
  }
}




  deleteGuide(): void {
    if (this.selectedGuide && this.selectedGuide.id !== undefined) {
      this.guideService.deleteGuide(this.selectedGuide.id).subscribe((response: any) => {
        // Remove the deleted guide from the local list
        this.guides = this.guides.filter(g => g.id !== this.selectedGuide?.id);
        this.closePopup();
      }, error => {
        console.error('Failed to delete guide:', error);
      });
    }
  }
  openCreateForm(): void {
    this.showCreateForm = true;
  }
  onMediaChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.newGuide.media = file;
    } else {
      this.newGuide.media = undefined; // Fix: Change 'null' to 'undefined'
    }
  }

  closeCreateForm(): void {
    this.showCreateForm = false;
    this.newGuide = {}; // Clear the form
  }
// Méthode pour créer un nouveau guide
createGuide(): void {
  const formData = new FormData();
  formData.append('titre', this.newGuide.titre || '');
  formData.append('contenu', this.newGuide.contenu || '');
  formData.append('datepublication', this.newGuide.datePublication || ''); // Ensure field names match API expectations
  formData.append('etape', this.newGuide.etape?.toString() || '');
  formData.append('domaine_id', this.newGuide.domaine_id?.toString() || '');
  if (this.newGuide.media) {
    formData.append('media', this.newGuide.media);
  }
  // Do not append created_by; it should be handled server-side

  this.guideService.createGuide(formData).subscribe({
    next: (response) => {
      console.log('Guide créé avec succès', response);
      this.getGuides();
      this.closeCreateForm();
    },
    error: (error) => {
      console.error('Erreur lors de la création du guide', error);
    }
  });
}



   // Méthode pour gérer le changement de fichier


}
