import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { SuperAdminService } from '../../../Services/super-admin.service';
import { NavbarComponent } from '../../Administrateurs/layouts/navbar/navbar.component';
import { SuperAdminLayoutComponent } from '../layouts/super-admin-layout/super-admin-layout.component';

@Component({
  selector: 'app-dashboard-super-admin',
  standalone: true,
  imports: [NavbarComponent, SuperAdminLayoutComponent, CommonModule, RouterLink],
  templateUrl: './dashboard-super-admin.component.html',
  styleUrls: ['./dashboard-super-admin.component.css'] // corrected from 'styleUrl' to 'styleUrls'
})
export class DashboardSuperAdminComponent implements OnInit {
  stats: { entrepreneurs: number; admins: number; guides: number } = {
    entrepreneurs: 0,
    admins: 0,
    guides: 0
  };

  categories: any[] = []; // Initialize categories with an empty array

  private router = inject(Router);

  constructor(private superAdminService: SuperAdminService) {}

  ngOnInit(): void {
    this.getStats();
    this.getCategories();
  }

  getStats(): void {
    this.superAdminService.getStats().subscribe(
      (response: { entrepreneurs: number; admins: number; guides: number }) => {
        this.stats = response;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des statistiques:', error);
      }
    );
  }

  getCategories(): void {
    this.superAdminService.getCategories().subscribe(
      (response: any[]) => {
        this.categories = response;
        console.log('Liste des catégories:', response);
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des catégories:', error);
      }
    );
  }

  viewDetails(categorie: any): void {
    console.log('Détails de la catégorie:', categorie);
    this.router.navigate(['/super-admin/categories', categorie.id]).catch(error => {
      console.error('Erreur lors de la navigation:', error);
    });
  }
}
