import { Component } from '@angular/core';
import { SuperAdminLayoutComponent } from "../../layouts/super-admin-layout/super-admin-layout.component";
import { NavbarComponent } from "../../../Administrateurs/layouts/navbar/navbar.component";

@Component({
  selector: 'app-categorie-list',
  standalone: true,
  imports: [SuperAdminLayoutComponent, NavbarComponent],
  templateUrl: './categorie-list.component.html',
  styleUrl: './categorie-list.component.css'
})
export class CategorieListComponent {

}
