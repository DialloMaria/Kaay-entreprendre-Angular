import { Component, OnInit } from '@angular/core';
import { EvenementService } from '../../../Services/evenement.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomaineService } from '../../../Services/domaine.service';

@Component({
  selector: 'app-evenement',
  standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.css']
})
export class EvenementComponent implements OnInit {
isUpdateFormVisible: any;
isAddFormVisible: any;
openCreateForm() {
throw new Error('Method not implemented.');
}

  evenements: any[] = [];
  newEvenement: any = {}; // Utilisé pour créer ou mettre à jour un événement
  isFormVisible: boolean = false;
  selectedEvenement?: any;
  domaines: any[] = [];


  constructor(private evenementService: EvenementService,
    private domaineService: DomaineService// Ajoutez ce service

  ) {}

  ngOnInit(): void {
    this.getEvenements();
    this.getDomaines(); // Récupérez les domaines au démarrage


  }

  getDomaines(): void {
    this.domaineService.getDomaines().subscribe({
      next: (response) => {
        this.domaines = response.data || response;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des domaines', error);
      }
    });
  }

  getEvenements(): void {
    this.evenementService.getEvenements().subscribe({
      next: (data) => this.evenements = data,
      error: (err) => console.error('Erreur lors de la récupération des événements', err)
    });
  }

  // createEvenement(): void {
  //   this.evenementService.createEvenement(this.newEvenement).subscribe({
  //     next: () => {
  //       this.getEvenements();
  //       this.newEvenement = {};
  //       this.isFormVisible = false;
  //     },
  //     error: (err) => console.error('Erreur lors de la création de l\'événement', err)
  //   });
  // }
 createEvenement(): void {
    const formData = new FormData();

    // Récupérer l'objet utilisateur depuis le localStorage
    const userString = localStorage.getItem('user');
    let userId: string | null = null;

    if (userString) {
        try {
            const user = JSON.parse(userString);
            userId = user.id;
        } catch (error) {
            console.error('Erreur lors du parsing du JSON:', error);
        }
    }

    if (!userId) {
        console.error('Aucun ID utilisateur trouvé dans le localStorage');
        return;
    }

    // Ajouter les données du formulaire
    formData.append('titre', this.newEvenement.titre);
    formData.append('description', this.newEvenement.description);
    if (this.newEvenement.image) {
        formData.append('image', this.newEvenement.image);
    }

    // Convertir la valeur du champ "online" en booléen
    const onlineValue = this.newEvenement.online === '1 '|| this.newEvenement.online === true ? '1' : '0';
    formData.append('online', onlineValue);

    formData.append('lieu', this.newEvenement.lieu);
    formData.append('domaine_id', this.newEvenement.domaine_id.toString());
    formData.append('created_by', userId);
    formData.append('modified_by', this.newEvenement.modified_by?.toString() || '');

    this.evenementService.createEvenement(formData).subscribe({
        next: (response) => {
            console.log('Événement créé avec succès', response);
            this.getEvenements();
            this.newEvenement = {};
            this.isFormVisible = false;
        },
        error: (error) => {
            console.error('Erreur lors de la création de l\'événement', error);
        }
    });
}



  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.newEvenement.image = file;
    }
}


  updateEvenement(): void {
    if (this.selectedEvenement && this.selectedEvenement.id) {
      this.evenementService.updateEvenement(this.selectedEvenement.id, this.selectedEvenement).subscribe({
        next: () => {
          this.getEvenements();
          this.selectedEvenement = null;
          this.isFormVisible = false;
        },
        error: (err) => console.error('Erreur lors de la mise à jour de l\'événement', err)
      });
    }
  }

  deleteEvenement(id: number): void {
    this.evenementService.deleteEvenement(id).subscribe({
      next: () => this.getEvenements(),
      error: (err) => console.error('Erreur lors de la suppression de l\'événement', err)
    });
  }

  openForm(event?: any): void {
    this.isFormVisible = true;
    if (event) {
      this.selectedEvenement = { ...event };
    } else {
      this.selectedEvenement = null;
    }
  }

  closeForm(): void {
    this.isFormVisible = false;
    this.newEvenement = {};
  }
}
