import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importer CommonModule pour les pipes comme date
import { FormsModule } from '@angular/forms'; // Importer FormsModule pour ngModel

@Component({
  selector: 'app-guide-add',
  standalone: true,
  imports: [CommonModule, FormsModule], // Ajouter FormsModule ici
  templateUrl: './guide-add.component.html',
  styleUrls: ['./guide-add.component.css']
})
export class GuideAddComponent {
 
}
