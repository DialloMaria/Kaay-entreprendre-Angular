import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Categorie } from '../../../Models/categories.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categorie',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent {
  @Input() categories: Categorie[] = [];
  @Output() categorieSelected = new EventEmitter<number>();
  selectedCategorieId: number | null = null;

  onSelectCategorie(categorieId: number): void {
    this.selectedCategorieId = categorieId;
    this.categorieSelected.emit(categorieId);
  }
}
