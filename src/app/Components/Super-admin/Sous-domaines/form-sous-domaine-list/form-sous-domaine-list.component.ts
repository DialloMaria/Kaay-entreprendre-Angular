import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SousDomaineService } from '../../../../Services/sous-domaine.service';
import { SousDomaine } from '../../../../Models/SousDomaine.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sous-domaine-form',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './form-sous-domaine-list.component.html',
  styleUrls: ['./form-sous-domaine-list.component.css']
})
export class SousDomaineFormComponent implements OnInit {
  sousDomaine: SousDomaine = { nom: '', description: '', domaine_id: 0 };
  isEditMode = false;

  constructor(
    private sousDomaineService: SousDomaineService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.getSousDomaine(parseInt(id, 10));
    }
  }

  getSousDomaine(id: number): void {
    this.sousDomaineService.getSousDomaine(id).subscribe(data => {
      this.sousDomaine = data;
    });
  }

  isAddModalOpen: boolean = false;

  // Méthode pour ouvrir le modal
  openAddSousDomaineModal() {
    this.isAddModalOpen = true;
  }

  // Méthode pour fermer le modal
  closeAddSousDomaineModal() {
    this.isAddModalOpen = false;
  }

  saveSousDomaine(): void {
    if (this.isEditMode) {
      this.sousDomaineService.updateSousDomaine(this.sousDomaine.id!, this.sousDomaine).subscribe(() => {
        this.router.navigate(['/sousdomaines']);
      });
    } else {
      this.sousDomaineService.createSousDomaine(this.sousDomaine).subscribe(() => {
        this.router.navigate(['/sousdomaine']);
      });
    }
    this.closeAddSousDomaineModal();
  }
}
