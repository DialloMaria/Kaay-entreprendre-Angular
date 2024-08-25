import { AuthService } from './../../../../Services/auth.service';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { SuperAdminService } from '../../../../Services/super-admin.service';
import { SousDomaineService } from './../../../../Services/sous-domaine.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SousDomaineFormComponent } from "../form-sous-domaine-list/form-sous-domaine-list.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sous-domaine-list',
  standalone: true,
  imports: [CommonModule, FormsModule, SousDomaineFormComponent],
  templateUrl: './sous-domaine-list.component.html',
  styleUrls: ['./sous-domaine-list.component.css']
})
export class SousDomaineListComponent implements OnInit, OnChanges {
  @Input() selectedDomaine: any;
  domaines: any[] = [];
  sousDomaines: any[] = [];
  selectedSousDomaines: any[] = [];
  selectedDomaineName: string = '';
  selectedEntrepreneurs: any[] = [];

  isAddModalOpen: boolean = false;
  isEditMode: boolean = false;
  sousDomaine: any = { nom: '', description: '', domaine_id: 0 };

  constructor(
    private superAdminService: SuperAdminService,
    private sousDomaineService: SousDomaineService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedDomaine'] && this.selectedDomaine) {
      this.getSousDomaines(this.selectedDomaine.id);
    }
  }

  getSousDomaines(domaineId: number): void {
    this.superAdminService.loadSousDomaines(domaineId).subscribe((response: any) => {
      this.sousDomaines = response.sousDomaines;
      this.selectedDomaineName = this.domaines.find(d => d.id === domaineId)?.nom || '';
      this.selectedSousDomaines = this.sousDomaines;
    },
    error => {
      console.error('Erreur lors de la récupération des sous-domaines:', error);
    });
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

  openAddSousDomaineModal() {
    this.isAddModalOpen = true;
    this.isEditMode = false; // Ensure it's in add mode
    this.sousDomaine = { nom: '', description: '', domaine_id: this.selectedDomaine.id }; // Reset form data
  }

  closeAddSousDomaineModal() {
    this.isAddModalOpen = false;
  }

  saveSousDomaine(): void {
    const currentUserId = this.authService.getSpecialisations();
    console.log('Current User ID:', currentUserId);  // Log l'ID utilisateur
    console.log('SousDomaine avant envoi:', this.sousDomaine);  // Log les données du sous-domaine

    if (this.isEditMode) {
        this.sousDomaine.modified_by = currentUserId;
        this.sousDomaineService.updateSousDomaine(this.sousDomaine.id!, this.sousDomaine).subscribe(() => {
            this.getSousDomaines(this.selectedDomaine.id);
            console.log("Sous-domaine mis à jour avec succès");
        }, error => {
            console.error('Erreur lors de la mise à jour:', error);
        });
    } else {
        this.sousDomaine.created_by = currentUserId;
        this.sousDomaineService.createSousDomaine(this.sousDomaine).subscribe(() => {
            this.getSousDomaines(this.selectedDomaine.id);
            console.log("Sous-domaine ajouté avec succès");
        }, error => {
            console.error('Erreur lors de l\'ajout:', error);
        });
    }
    this.closeAddSousDomaineModal();
}

  editSousDomaine(sousDomaine: any): void {
    this.sousDomaine = { ...sousDomaine }; 
    this.isEditMode = true;
    this.isAddModalOpen = true;
  }


  // deleteSousDomaine(sousDomaineId: number): void {
  //   if (confirm('Voulez-vous vraiment supprimer ce sous-domaine ?')) {
  //     this.sousDomaineService.deleteSousDomaine(sousDomaineId).subscribe(() => {
  //       this.getSousDomaines(this.selectedDomaine.id); // Reload the list after deletion
  //     });
  //   }
  // }

  deleteSousDomaine(sousDomaineId: number): void {
    console.log('SousDomaine ID à supprimer:', sousDomaineId); // Vérifiez que l'ID est correct

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
        this.sousDomaineService.deleteSousDomaine(sousDomaineId).subscribe(
          () => {
            console.log('Sous-domaine supprimé avec succès'); // Confirmation du succès
            Swal.fire(
              'Supprimé !',
              'Le sous-domaine a été supprimé.',
              'success'
            );
            this.getSousDomaines(this.selectedDomaine.id); // Actualiser la liste des sous-domaines
          },
          error => {
            console.error('Erreur lors de la suppression:', error); // Log des erreurs
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
