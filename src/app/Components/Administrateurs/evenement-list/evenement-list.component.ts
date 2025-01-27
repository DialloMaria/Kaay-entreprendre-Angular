import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../Administrateurs/layouts/navbar/navbar.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EvenementService } from '../../../Services/evenement.service';
import { DomaineService } from '../../../Services/domaine.service';
import { EvenementModel } from '../../../Models/evenements.model';
import { AdminLayoutComponent } from "../layouts/admin-layout/admin-layout.component";

@Component({
  selector: 'app-evenement-list',
  standalone: true,
  imports: [ NavbarComponent, CommonModule, FormsModule, AdminLayoutComponent],
  templateUrl: './evenement-list.component.html',
  styleUrl: './evenement-list.component.css'
})
export class EvenementsListComponent  implements OnInit {
  evenements: any[] = [];
  newEvenement: any = {}; // Utilisé pour créer ou mettre à jour un événement
  isFormVisible: boolean = false;
  selectedEvenement?: any;
  domaines: any[] = [];
  totalEvents: number = 0;
  upcomingEvents: number = 0;
  pastEvents: number = 0;
  filteredEvents: any[] = [];
  allEvents: any[] = [];
  filter: string = 'all';
  isAddFormVisible = false;
  isUpdateFormVisible = false;

  imageGuide:string = "";
  messageImage: string = "Aucune image pour ce guide";




  filteredEvenements: any[] = [];


  constructor(private evenementService: EvenementService,
    private domaineService: DomaineService// Ajoutez ce service

  ) {}


  ngOnInit(): void {
    this.getEvenements();
    this.getDomaines(); // Récupérez les domaines au démarrage
    this.loadEvents();


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
        next: (response: any) => {
            this.evenements = response.data || response;

            if (this.evenements && Array.isArray(this.evenements)) {
                this.evenements = this.evenements.map((evenement: EvenementModel) => {
                    const imageUrl = evenement.image?.startsWith('evenements/')
                        ? `http://127.0.0.1:8000/storage/${evenement.image}`
                        : `http://127.0.0.1:8000/storage/evenements/${evenement.image}`;

                    return {
                        ...evenement,
                        image: imageUrl,
                    };
                });
            } else {
                console.error('Invalid events data:', this.evenements);
            }
        },
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
    formData.append('titre', this.newEvenement.titre || '');
    formData.append('description', this.newEvenement.description || '');

    // Ajouter l'image uniquement si elle est définie
    if (this.newEvenement.image && this.newEvenement.image instanceof File) {
        formData.append('image', this.newEvenement.image);
    }

    // Convertir la valeur du champ "online" en booléen
    const onlineValue = this.newEvenement.online === '1' || this.newEvenement.online === true ? '1' : '0';
    formData.append('online', onlineValue);

    formData.append('lieu', this.newEvenement.lieu || '');
    formData.append('date_debut', this.newEvenement.date_debut || '');
    formData.append('domaine_id', this.newEvenement.domaine_id?.toString() || '');
    formData.append('created_by', userId);
    formData.append('modified_by', this.newEvenement.modified_by?.toString() || '');

    // Assurez-vous que l'appel au service est correct et que le service attend des données de type FormData
    this.evenementService.createEvenement(formData).subscribe({
        next: (response) => {
            console.log('Événement créé avec succès', response);
            this.getEvenements(); // Recharger la liste des événements
            this.newEvenement = {}; // Réinitialiser le formulaire
            this.isFormVisible = false; // Masquer le formulaire
        },
        error: (error) => {
            console.error('Erreur lors de la création de l\'événement', error);
        }
    });
}




updateEvenement(): void {

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
  if (this.selectedEvenement && this.selectedEvenement.id) {
    const formData = new FormData();
    formData.append('titre', this.selectedEvenement.titre || '');
    formData.append('description', this.selectedEvenement.description || '');
    if (this.selectedEvenement.image && this.selectedEvenement.image instanceof File) {
      formData.append('image', this.selectedEvenement.image);
    }
    formData.append('online', this.selectedEvenement.online ? '1' : '0');
    formData.append('lieu', this.selectedEvenement.lieu || '');
    formData.append('date_debut', this.newEvenement.date_debut || '');

    formData.append('domaine_id', this.selectedEvenement.domaine_id?.toString() || '');
    formData.append('created_by', userId);
    formData.append('update_by', userId);


    this.evenementService.updateEvenement(this.selectedEvenement.id, formData).subscribe({
      next: () => {
        this.getEvenements();
        this.closeForm();
      },
      error: (err) => console.error('Erreur lors de la mise à jour de l\'événement', err)
    });
  }
}
onFileSelected(event: any): void {
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    if (this.isUpdateFormVisible) {
      this.selectedEvenement.image = file;
    } else {
      this.newEvenement.image = file;
    }
  }
}

deleteEvenement(id: number): void {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
    this.evenementService.deleteEvenement(id).subscribe({
      next: () => {
        console.log('Événement supprimé avec succès');
        this.getEvenements();
      },
      error: (err) => console.error('Erreur lors de la suppression de l\'événement', err)
    });
  }
}



  closeForm(): void {
    this.isAddFormVisible = false;
    this.isUpdateFormVisible = false;
  }

  openForm(evenement?: any): void {
    if (evenement) {
      this.selectedEvenement = { ...evenement };
      this.newEvenement = {}; // Réinitialiser pour éviter les conflits
      this.isAddFormVisible = false;
      this.isUpdateFormVisible = true;
    } else {
      this.selectedEvenement = null;
      this.newEvenement = {};
      this.isAddFormVisible = true;
      this.isUpdateFormVisible = false;
    }
  }

  updateStats() {
    this.totalEvents = this.allEvents.length;
    this.upcomingEvents = this.allEvents.filter(event => new Date(event.date_debut) > new Date()).length;
    this.pastEvents = this.allEvents.filter(event => new Date(event.date_debut) <= new Date()).length;
  }

  loadEvents(): void {
    this.evenementService.getEvenements().subscribe(events => {
      this.evenements = events;
      this.applyFilter(); // Apply the default filter
    });
  }

  filterEvents(filter: string): void {
    this.filter = filter;
    this.applyFilter();
  }

  applyFilter(): void {
    switch (this.filter) {
      case 'online':
        this.filteredEvenements = this.evenements.filter(event => event.online && new Date(event.date_debut) < new Date());
        break;
      case 'physical':
        this.filteredEvenements = this.evenements.filter(event => !event.online &&  new Date(event.date_debut) < new Date());
        break;
      case 'past':
        this.filteredEvenements = this.evenements.filter(event => new Date(event.date_debut) < new Date());
        break;
      default:
        this.filteredEvenements = this.evenements;
        break;
    }
  }

}
