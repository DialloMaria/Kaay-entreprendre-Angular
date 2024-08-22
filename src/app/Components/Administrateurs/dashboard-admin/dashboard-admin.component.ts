import { Component  } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../layouts/navbar/navbar.component';
import { GuideListComponent } from "../Guides/guide-dashboard/guide-list.component";
import { SuperAdminService } from '../../../Services/super-admin.service';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule, NavbarComponent, AdminLayoutComponent, GuideListComponent],

  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css'
})
export class DashboardAdminComponent {
  // nom utilisateur qui a connect et son role
  stats: { entrepreneurs: number; guides: number , evenements: number } = {
    entrepreneurs: 0,
    guides: 0,
    evenements:0
  };
  constructor(private superAdminService: SuperAdminService) {}

  ngOnInit(): void {
    this.getStats();

}
getStats(): void {
  this.superAdminService.getStats().subscribe(
    (response: { entrepreneurs: number; evenements: number; guides: number }) => {
      this.stats = response;
    },
    (error: any) => {
      console.error('Erreur lors de la récupération des statistiques:', error);
    }
  );
}
}


