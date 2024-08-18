import { Component, OnInit } from '@angular/core';
import { SuperAdminLayoutComponent } from "../layouts/super-admin-layout/super-admin-layout.component";
import { NavbarComponent } from '../../Administrateurs/layouts/navbar/navbar.component';
import { SuperAdminService } from '../../../Services/super-admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-super-admin',
  standalone: true,
  imports: [NavbarComponent, SuperAdminLayoutComponent, CommonModule],
  templateUrl: './dashboard-super-admin.component.html',
  styleUrl: './dashboard-super-admin.component.css'
})
export class DashboardSuperAdminComponent implements OnInit {
  stats: any = {
    entrepreneurs: 0,
    admins: 0,
    guides: 0
  };

  categories: any

  constructor(private superAdminService: SuperAdminService) {}

  
  ngOnInit(): void {
    this.getStats();
    this.getCategories();
  }
  getStats() {
    this.superAdminService.getStats().subscribe(
      (response: any) => {
        this.stats = response;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des statistiques:', error);
      }
    );
  }
  // Méthode pour obtenir la liste des categories
getCategories(): void {
  this.superAdminService.getCategories().subscribe(
    (response: any) => {
      this.categories = response;
      
      console.log('Liste des catégories:', response);
    },
    (error: any) => {
      console.error('Erreur lors de la récupération des catégories:', error);
    }
  );
}

}
