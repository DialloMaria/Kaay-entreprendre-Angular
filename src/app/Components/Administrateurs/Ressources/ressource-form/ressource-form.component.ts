import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GuideModel } from '../../../../Models/guides.model';
import { GuideService } from '../../../../Services/guide.service';
import { RessourceService } from '../../../../Services/ressource.service';
import { Ressource } from '../../../../models/ressource.model';

@Component({
  selector: 'app-ressource-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ressource-form.component.html',
  styleUrls: ['./ressource-form.component.css']
})
export class RessourceFormComponent implements OnInit {
  form: FormGroup;
  ressourceId: number | null = null;
  ressources: Ressource[] = [];
  guides: GuideModel[] = [];
  isEditing = false;
  isAddFormVisible = false;
  isUpdateFormVisible = false;
  selectedRessourceId?: number;

  constructor(
    private fb: FormBuilder,
    private ressourceService: RessourceService,
    private guideService: GuideService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      lien: ['', [Validators.required, Validators.pattern('https?://.+')]],
      type: ['', Validators.required],
      guide_id: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.getRessources();
    this.getGuides();

    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      if (id) {
        this.ressourceId = id;
        this.isEditing = true;
        this.loadRessource(id);
      }
    });
  }

  getRessources(): void {
    this.ressourceService.getRessources().subscribe((response: any) => {
      this.ressources = response.data;
    });
  }

  getGuides(): void {
    this.guideService.getGuides().subscribe(
      (data: GuideModel[]) => {
        this.guides = data;
      },
      error => {
        console.error('Erreur lors du chargement des guides :', error);
      }
    );
  }

  loadRessource(id: number) {
    this.ressourceService.getRessource(id).subscribe(
      (ressource: Ressource) => {
        this.form.patchValue(ressource);
        this.openForm(); // Afficher le formulaire de modification
      },
      error => console.error('Erreur lors du chargement de la ressource', error)
    );
  }

  onSubmit() {
    const userString = localStorage.getItem('user');
    const userId = userString ? JSON.parse(userString).id : null;

    if (!userId) {
      console.error('Aucun ID utilisateur trouvé dans le localStorage');
      return;
    }

    const formData = { ...this.form.value, created_by: userId };

    if (this.form.valid) {
      if (this.isEditing && this.ressourceId) {
        // Mise à jour de la ressource existante
        this.ressourceService.updateRessource(this.ressourceId, formData).subscribe(
          () => {
            // Réinitialiser le formulaire et fermer le formulaire de modification
            this.form.reset();
            this.closeForm();
            this.getRessources(); // Optionnellement rafraîchir la liste
          },
          error => console.error('Erreur lors de la mise à jour de la ressource', error)
        );
      } else {
        // Création d'une nouvelle ressource
        this.ressourceService.createRessource(formData).subscribe(
          () => {
            // Réinitialiser le formulaire et fermer le formulaire d'ajout
            this.form.reset();
            this.closeForm();
            this.getRessources(); // Optionnellement rafraîchir la liste
          },
          error => console.error('Erreur lors de la création de la ressource', error)
        );
      }
    } else {
      console.error('Le formulaire n\'est pas valide');
    }
  }


  closeForm(): void {
    this.isAddFormVisible = false;
    this.isUpdateFormVisible = false;
  }

  openForm(ressource?: Ressource): void {
    if (ressource) {
      this.form.patchValue(ressource);
      this.isAddFormVisible = false;
      this.isUpdateFormVisible = true;
    } else {
      this.form.reset();
      this.isAddFormVisible = true;
      this.isUpdateFormVisible = false;
    }
  }

  editRessource(id: number): void {
    this.selectedRessourceId = id;
    this.isUpdateFormVisible = true;
    this.isAddFormVisible = false;

    // Trouver la ressource par son ID
    const ressource = this.ressources.find(r => r.id === id);
    if (ressource) {
      this.form.patchValue({
        titre: ressource.titre,
        description: ressource.description,
        lien: ressource.lien,
        type: ressource.type,
        guide_id: ressource.guide_id
      });
    }
  }

  deleteRessource(ressourceId?: number) {
    if (ressourceId !== undefined) {
      this.ressourceService.deleteRessource(ressourceId).subscribe(
        () => this.getRessources(), // Optionnellement rafraîchir la liste
        (error) => {
          console.error('Erreur lors de la suppression de la ressource', error);
        }
      );
    }
  }

  showAddForm(): void {
    this.isAddFormVisible = true;
  }
}
