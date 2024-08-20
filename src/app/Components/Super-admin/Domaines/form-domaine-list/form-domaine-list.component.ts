import { DomaineService } from './../../../../Services/domaine.service';
// src/app/components/domaine-form/domaine-form.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Domaine } from '../../../../Models/domaine.model';
import { CommonModule } from '@angular/common'; // Importer CommonModule
import { CategoriService } from '../../../../Services/categorie.service';


@Component({
  selector: 'app-domaine-form',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './form-domaine-list.component.html',
  styleUrl: './form-domaine-list.component.css'
})
export class FormDomaineListComponent implements OnInit {
  domaine: Domaine = { nom: '', categorie_id: 0 };
  category: any; // Adjust according to your actual category type
  isEditMode = false;

  constructor(
    private domaineService: DomaineService,
    private categoryService: CategoriService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.getDomaine(parseInt(id, 10));
    }

    // Fetch the category
    this.categoryService.getCategories().subscribe((data: any) => { // Adjust to your method for fetching category
      this.category = data;
      this.domaine.categorie_id = this.category.id;
    });
  }

  getDomaine(id: number): void {
    this.domaineService.getDomaine(id).subscribe((data: Domaine) => {
      this.domaine = data;
    });
  }

  saveDomaine(): void {
    if (this.isEditMode) {
      this.domaineService.updateDomaine(this.domaine.id!, this.domaine).subscribe(() => {
        this.router.navigate(['/domaines']);
      });
    } else {
      this.domaineService.createDomaine(this.domaine).subscribe(() => {
        this.router.navigate(['/domaines']);
      });
    }
  }


  // saveDomaine(): void {
  //   if (this.isEditMode) {
  //     this.DomaineService.updateDomaine(this.domaine.id!, this.domaine).subscribe(() => {
  //       this.router.navigate(['/domaines']);
  //     });
  //   } else {
  //     this.DomaineService.createDomaine(this.domaine).subscribe(() => {
  //       this.router.navigate(['/domaines']);
  //     });
  //   }
  // }
}
