import { Component, OnInit } from '@angular/core';
import { SuperAdminLayoutComponent } from "../../layouts/super-admin-layout/super-admin-layout.component";
import { NavbarComponent } from "../../../Administrateurs/layouts/navbar/navbar.component";
import { SuperAdminService } from '../../../../Services/super-admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { SousDomaineListComponent } from '../../Sous-domaines/sous-domaine-list/sous-domaine-list.component';

import { Domaine } from '../../../../Models/domaine.model';
import { DomaineService } from '../../../../Services/domaine.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { FormDomaineListComponent } from '../../Domaines/form-domaine-list/form-domaine-list.component';
import { AuthService } from '../../../../Services/auth.service';
import { SousDomaineService } from '../../../../Services/sous-domaine.service';

@Component({
  selector: 'app-categorie-list',
  standalone: true,
  imports: [
    SuperAdminLayoutComponent,
    FormsModule,
    NavbarComponent,
    CommonModule,
    SousDomaineListComponent,
    FormDomaineListComponent
  ],
  templateUrl: './categorie-service.component.html',
  styleUrls: ['./categorie-service.component.css']
})
export class CategorieServiceComponent implements OnInit {
  category: any;
  domaines: any[] = [];
  domaine: Domaine = { nom: '', categorie_id: 0 };
  isEditMode = false;
  selectedDomaine: any = null;
  selectedEntrepreneurs: any[] = [];
  sousDomaines: any[] = [];
  selectedSousDomaines: any[] = [];
  selectedDomaineName: string = '';
  isAddModalOpen: boolean = false;
  sousDomaine: any = { nom: '', description: '', domaine_id: 0 };

  constructor(
    private superAdminService: SuperAdminService,
    private domaineService: DomaineService,
    private sousDomaineService: SousDomaineService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      const categorieId = Number(params.get('categorie_id'));
      const domaineId = Number(params.get('domaine_id'));

      // Fetch category details
      if (id) {
        this.getCategoryDetails(id);
      }

      // Set the domaine's categorie_id
      if (categorieId) {
        this.domaine.categorie_id = categorieId;
      }

      // If in edit mode, fetch the specific domaine details
      if (domaineId) {
        this.isEditMode = true; // Ensure edit mode is set if domaineId is present
        this.getDomaine(domaineId);
      }
    });

    this.sousDomaineService.getSousDomaines().subscribe(data => {
      this.sousDomaines = data;
    });
  }

  getCategoryDetails(id: number): void {
    this.superAdminService.getCategoryById(id).subscribe(
      (response: any) => {
        this.category = response.categorie;
        this.domaines = response.domaines;
      },
      error => {
        console.error('Erreur lors de la récupération de la catégorie:', error);
      }
    );
  }

  getDomaine(id: number): void {
    this.domaineService.getDomaine(id).subscribe(
      (data: Domaine) => {
        console.log('Fetched domaine:', data);
        this.domaine = data;
      },
      error => {
        console.error('Failed to fetch domain data', error);
      }
    );
  }

  saveDomaine(): void {
    if (this.domaine.categorie_id === 0) {
      console.error('Categorie ID is not set.');
      return;
    }

    if (this.isEditMode) {
      if (this.domaine.id) {
        this.domaineService.updateDomaine(this.domaine.id, this.domaine).subscribe(
          () => {
            this.router.navigate(['/super-admin/categories', this.domaine.categorie_id]);
          },
          error => {
            console.error('Failed to update domain', error);
          }
        );
      } else {
        console.error('Domaine ID is undefined, cannot update domain');
      }
    } else {
      this.domaineService.createDomaine(this.domaine).subscribe(
        (response: any) => {
          const createdDomaineId = response.id;
          if (createdDomaineId) {
            this.router.navigate(['/domaines', createdDomaineId]);
          } else {
            console.error('Failed to retrieve the ID of the newly created domain');
          }
          this.domaine = { nom: '', categorie_id: 0 };
        },
        error => {
          console.error('Failed to create domain', error);
        }
      );
    }
  }

  filterSousDomaines(domaine: any): void {
    this.selectedDomaine = domaine;
  }

  editDomaine(id: number): void {
    this.router.navigate(['/domaines/edit', id]);
  }

  getDomaines(): void {
    this.domaineService.getDomaines().subscribe((response: any) => {
      this.domaines = response.data;
    });
  }

  deleteDomaine(id: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Cette action est irréversible !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.domaineService.deleteDomaine(id).subscribe(
          () => {
            Swal.fire(
              'Supprimé !',
              'Le domaine a été supprimé.',
              'success'
            );
            this.getDomaines();
          },
          error => {
            Swal.fire(
              'Erreur',
              'Une erreur est survenue lors de la suppression.',
              'error'
            );
          }
        );
      }
    });
  }

  getSousDomaines(domaineId: number): void {
    this.superAdminService.loadSousDomaines(domaineId).subscribe(
      (response: any) => {
        this.sousDomaines = response.sousDomaines;
        this.selectedDomaineName = this.domaines.find(d => d.id === domaineId)?.nom || '';
        this.selectedSousDomaines = this.sousDomaines;
      },
      error => {
        console.error('Erreur lors de la récupération des sous-domaines:', error);
      }
    );
  }

  showEntrepreneurs(sousDomaineId: number): void {
    this.superAdminService.getEntrepreneursBySousDomaine(sousDomaineId).subscribe(
      (response: any) => {
        this.selectedEntrepreneurs = response.entrepreneurs;
      },
      error => {
        console.error('Erreur lors de la récupération des entrepreneurs:', error);
      }
    );
  }

  openAddSousDomaineModal(): void {
    this.isAddModalOpen = true;
    this.sousDomaine = { nom: '', description: '', domaine_id: this.selectedDomaine.id };
  }

  closeAddSousDomaineModal(): void {
    this.isAddModalOpen = false;
  }

  saveSousDomaine(): void {
    this.sousDomaineService.createSousDomaine(this.sousDomaine).subscribe(
      () => {
        Swal.fire('Sous-domaine ajouté avec succès !');
        this.getSousDomaines(this.selectedDomaine.id);
        this.closeAddSousDomaineModal();
      },
      error => {
        console.error('Erreur lors de l\'ajout du sous-domaine :', error);
      }
    );
  }
  editSousDomaine(sousDomaine: any): void {
    this.sousDomaine = { ...sousDomaine };
    this.isEditMode = true;
    this.isAddModalOpen = true;
  }
  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  deleteSousDomaine(id: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Cette action est irréversible !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.sousDomaineService.deleteSousDomaine(id).subscribe(
          () => {
            Swal.fire(
              'Supprimé !',
              'Le sous-domaine a été supprimé.',
              'success'
            );
            this.getSousDomaines(this.selectedDomaine.id);
          },
          error => {
            Swal.fire(
              'Erreur',
              'Une erreur est survenue lors de la suppression.',
              'error'
            );
          }
        );
      }
    });
  }
}
