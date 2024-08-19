import { Component } from '@angular/core';
import { SuperAdminLayoutComponent } from "../../layouts/super-admin-layout/super-admin-layout.component";
import { NavbarComponent } from "../../../Administrateurs/layouts/navbar/navbar.component";

@Component({
  selector: 'app-evenement-list',
  standalone: true,
  imports: [SuperAdminLayoutComponent, NavbarComponent],
  templateUrl: './evenement-list.component.html',
  styleUrl: './evenement-list.component.css'
})
export class EvenementListComponent {

}
