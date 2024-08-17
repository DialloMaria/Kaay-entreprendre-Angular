import { Component  } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../layouts/navbar/navbar.component';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule, NavbarComponent, AdminLayoutComponent],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css'
})
export class DashboardAdminComponent {
  // nom utilisateur qui a connect et son role

}


