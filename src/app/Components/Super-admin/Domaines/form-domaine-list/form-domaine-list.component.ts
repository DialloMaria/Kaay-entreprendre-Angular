import { DomaineService } from './../../../../services/domaine.service';
// src/app/components/domaine-form/domaine-form.component.ts
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Domaine } from '../../../../Models/domaine.model';
import { CommonModule } from '@angular/common'; // Importer CommonModule


@Component({
  selector: 'app-domaine-form',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './form-domaine-list.component.html',
  styleUrl: './form-domaine-list.component.css'
})
export class FormDomaineListComponent {
  domaine: Domaine = { nom: '', categorie_id: 0 };
  isEditMode = false;

  constructor(
    private DomaineService: DomaineService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.getDomaine(parseInt(id, 10));
    }
  }

  getDomaine(id: number): void {
    this.DomaineService.getDomaine(id).subscribe((data: Domaine) => {
      this.domaine = data;
    });
  }

  saveDomaine(): void {
    if (this.isEditMode) {
      this.DomaineService.updateDomaine(this.domaine.id!, this.domaine).subscribe(() => {
        this.router.navigate(['/domaines']);
      });
    } else {
      this.DomaineService.createDomaine(this.domaine).subscribe(() => {
        this.router.navigate(['/domaines']);
      });
    }
  }
}

