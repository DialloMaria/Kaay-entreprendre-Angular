import { Component, OnInit } from '@angular/core';
import { Categorie } from '../../../Models/categories.model';
import { CommonModule } from '@angular/common';
import { CategorieComponent } from '../categorie/categorie.component';
import { DomaineComponent } from '../domaine/domaine.component';
import { SousDomaineComponent } from '../sous-domaine/sous-domaine.component';
import { CategoriService } from '../../../Services/categorie.service';
import { DomaineService } from '../../../Services/domaine.service'; // Importez le nouveau service
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NavbarComponent } from "../../Administrateurs/layouts/navbar/navbar.component";
import { NavbarEntrepreneurComponent } from '../layout/navbar-entrepreneur/navbar-entrepreneur.component';

@Component({
  selector: 'app-inscrit-domaine',
  standalone: true,
  imports: [CommonModule, CategorieComponent, DomaineComponent, SousDomaineComponent, RouterLink, NavbarEntrepreneurComponent],
  providers: [CategoriService, DomaineService,],
  templateUrl: './inscrit-domaine.component.html',
  styleUrls: ['./inscrit-domaine.component.css']
})
export class InscritDomaineComponent implements OnInit {
  categories: Categorie[] = [];
  selectedCategorieId: number | null = null;
  selectedDomaineId: number | null = null;
  sousDomaines: any[] = []; // Ajoutez une propriété pour les sous-domaines

  constructor(private categorieService: CategoriService, private domaineService: DomaineService ,    private route: ActivatedRoute, ) {}

  ngOnInit(): void {
    this.categorieService.getCategories().subscribe((data: Categorie[]) => {
      this.categories = data;
    });
  }

  onCategorieSelected(categorieId: number): void {
    this.selectedCategorieId = categorieId;
    this.selectedDomaineId = null;
    // Charger les sous-domaines associés à cette catégorie
    this.loadSousDomaines(categorieId);
  }

  onDomaineSelected(domaineId: number): void {
    this.selectedDomaineId = domaineId;
  }

  loadSousDomaines(categorieId: number): void {
    // Appelez le service pour charger les sous-domaines (à implémenter)
    // this.domaineService.getSousDomaines(categorieId).subscribe(sousDomaines => {
    //   this.sousDomaines = sousDomaines;
    // });
  }


}
