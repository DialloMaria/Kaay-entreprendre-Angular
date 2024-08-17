import { Component } from '@angular/core';
import { NavbarComponent } from "../layouts/navbar/navbar.component";
import { SuperAdminLayoutComponent } from "../layouts/super-admin-layout/super-admin-layout.component";

@Component({
  selector: 'app-dashboard-super-admin',
  standalone: true,
  imports: [NavbarComponent, SuperAdminLayoutComponent],
  templateUrl: './dashboard-super-admin.component.html',
  styleUrl: './dashboard-super-admin.component.css'
})
export class DashboardSuperAdminComponent {

}
