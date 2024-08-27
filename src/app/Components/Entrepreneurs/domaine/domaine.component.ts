import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Domaine } from '../../../Models/domaine.model';
import { DomaineService } from '../../../Services/domaine.service';
import { CommonModule } from '@angular/common';
import { NavbarEntrepreneurComponent } from '../layout/navbar-entrepreneur/navbar-entrepreneur.component';

@Component({
  selector: 'app-domaine',
  standalone: true,
  imports: [CommonModule,NavbarEntrepreneurComponent],
  providers: [DomaineService],
  templateUrl: './domaine.component.html',
  styleUrls: ['./domaine.component.css']
})
export class DomaineComponent implements OnChanges {

  @Input() categorieId!: number;
  @Output() domaineSelected = new EventEmitter<number>();
  domaines: Domaine[] = []; 

  constructor(private domaineService: DomaineService) {}

ngOnChanges(changes: SimpleChanges): void {
  if (changes['categorieId'] && this.categorieId) {
    this.domaineService.getDomainesByCategorie(this.categorieId).subscribe(
      (data: Domaine[]) => {
        console.log('Réponse API:', data); // Assurez-vous que 'data' est bien un tableau
        this.domaines = data;  // Assignation correcte des données
      },
      (error) => {
        console.error('Erreur lors de la récupération des domaines', error);
      }
    );
  }
}

  onSelectDomaine(domaineId: number | undefined): void {
    this.domaineSelected.emit(domaineId as number);
  }
  
  
  
}
