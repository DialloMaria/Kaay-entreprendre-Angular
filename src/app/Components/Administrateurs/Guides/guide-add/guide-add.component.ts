import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importer CommonModule pour les pipes comme date
import { FormsModule } from '@angular/forms'; // Importer FormsModule pour ngModel
import { GuideService } from '../../../../services/guide.service';
import { Guide } from '../../../../models/guide.model';

@Component({
  selector: 'app-guide-add',
  standalone: true,
  imports: [CommonModule, FormsModule], // Ajouter FormsModule ici
  templateUrl: './guide-add.component.html',
  styleUrls: ['./guide-add.component.css']
})
export class GuideAddComponent {
  public guideData: Guide = {
    id: 0,
    titre: '',
    contenu: '',
    datepublication: '',
    media: '',
    auteur: '',
    domaine_id: 0,
    user_id: 0
  };

  constructor(private guideService: GuideService) {}

  addGuide() {
    this.guideService.createGuide(this.guideData).subscribe(
      response => {
        console.log('Guide ajouté avec succès', response);
      },
      error => {
        console.error('Erreur lors de l\'ajout du guide', error);
      }
    );
  }
}
