import { Component  } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../layouts/navbar/navbar.component';
import { SuperAdminLayoutComponent } from '../layouts/super-admin-layout/super-admin-layout.component';
import { GuideListComponent } from "../Guides/guide-list/guide-list.component";

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule, NavbarComponent, SuperAdminLayoutComponent, GuideListComponent],

  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css'
})
export class DashboardAdminComponent {
  // nom utilisateur qui a connect et son role

}


