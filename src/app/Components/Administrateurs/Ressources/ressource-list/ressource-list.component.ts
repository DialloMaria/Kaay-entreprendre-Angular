import { Component, Input, OnInit } from '@angular/core';
import { Ressource } from '../../../../models/ressource.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ressource-list',
  templateUrl: './ressource-list.component.html',
  styleUrls: ['./ressource-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class RessourceListComponent implements OnInit {
  @Input() ressources: Ressource[] = [];  // Recevoir les ressources via @Input()
  activeAccordionId: number | null = null;

  constructor() {}

  ngOnInit(): void {
    // Initialiser le premier accordéon actif, si des ressources sont disponibles
    if (this.ressources.length > 0) {
      this.activeAccordionId = this.ressources[0].id;
    }
  }

  toggleAccordion(id: number): void {
    this.activeAccordionId = this.activeAccordionId === id ? null : id;
  }

  isActive(id: number): boolean {
    return this.activeAccordionId === id;
  }
}
