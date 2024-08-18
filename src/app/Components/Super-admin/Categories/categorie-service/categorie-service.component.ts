import { Component, OnInit } from '@angular/core';
import { SuperAdminLayoutComponent } from "../../layouts/super-admin-layout/super-admin-layout.component";
import { NavbarComponent } from "../../../Administrateurs/layouts/navbar/navbar.component";
import { SuperAdminService } from '../../../../Services/super-admin.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { SousDomaineListComponent } from '../../Sous-domaines/sous-domaine-list/sous-domaine-list.component';

@Component({
  selector: 'app-categorie-list',
  standalone: true,
  imports: [SuperAdminLayoutComponent, NavbarComponent, CommonModule, SousDomaineListComponent],
  templateUrl: './categorie-service.component.html',
  styleUrl: './categorie-service.component.css'
})
export class CategorieServiceComponent implements OnInit {
    // Méthode pour obtenir la details d'un categorie
    category: any;
    domaines: any[] = [];
    sousDomaines :any[] = [];
    selectedSousDomaines: any[] = [];
    selectedDomaineName: string = '';
    selectedDomaine: any = null;


    constructor(
      private route: ActivatedRoute,
      private superAdminService: SuperAdminService,
      private http: HttpClient
    ) {}
    ngOnInit(): void {
      let id = this.route.snapshot.paramMap.get('id');

      if (id) {
        this.getCategoryDetails(Number(id));
      }

      this.loadSousDomaines(Number(id)); // Par défaut, on charge les sous-domaines du domaine avec l'id 1 (id = 1 correspond à l'id du domaine "Tous")

    }



    loadSousDomaines(domaineId: number): void {
      this.superAdminService.loadSousDomaines(domaineId).subscribe((response: any) => {
        this.selectedSousDomaines = response.sousDomaines;
        console.log('Sous-domaines du domaine:', this.selectedSousDomaines);
        this.selectedDomaineName = this.domaines.find(d => d.id === domaineId)?.nom;

           });
    }


  getCategoryDetails(id: number) {
    if (id) {
      this.superAdminService.getCategoryById(id).subscribe(
        (response: any) => {
          this.category = response.categorie;
          this.domaines = response.domaines;
          this.sousDomaines = response.sousDomaines;
          console.log('Détails de la catégorie:', this.category);
          console.log('Domaines de la catégorie:', this.domaines);
          console.log('Sous-domaines de la catégorie:', this.sousDomaines);
        },
        (error: any) => {
          console.error('Erreur lors de la récupération de la catégorie:', error);
        }
      );
    }

    }
    filterSousDomaines(domaine: any): void {
      this.selectedDomaine = domaine;
    }
  



}
