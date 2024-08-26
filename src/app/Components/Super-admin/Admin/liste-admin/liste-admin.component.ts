import { Component, OnInit } from '@angular/core';
import { SuperAdminLayoutComponent } from "../../layouts/super-admin-layout/super-admin-layout.component";
import { NavbarComponent } from "../../../Administrateurs/layouts/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../../Services/admin.service';
import { FormGroup } from '@angular/forms';
import { InscriptionAdminComponent } from "../../../Portails/authentification/inscription_admin/inscription-admin.component";
interface Entrepreneur {
  nom?: string;
  prenom?: string;
  telephone?: string;
  email?: string;
  adresse?: string;
}
@Component({
  selector: 'app-categorie-list',
  standalone: true,
  imports: [SuperAdminLayoutComponent, NavbarComponent, CommonModule, InscriptionAdminComponent],
  templateUrl: './liste-admin.component.html',
  styleUrl: './liste-admin.component.css'
})
export class ListeAdminComponent implements OnInit {
  entrepreneurs: any[] = [];
  paginatedEntrepreneurs: Entrepreneur[] = [];
  isAdminModalOpen = false;
  registrationForm: FormGroup | undefined;


  pageSize = 2;  // Number of entrepreneurs per page
  currentPage = 1;
  totalPages = 0;

  ngOnInit() {
    this.updatePaginatedEntrepreneurs();
    this.getAdmins();

  }
  constructor(private entrepreneurService: AdminService) { }

  getAdmins(): void {
    this.entrepreneurService.getAdmins().subscribe(response => {
      this.entrepreneurs = response.data || response; // Ajustez si nécessaire
      this.totalPages = Math.ceil(this.entrepreneurs.length / this.pageSize); // Nombre total de pages
      this.updatePaginatedEntrepreneurs();
    });
  }


  updatePaginatedEntrepreneurs() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedEntrepreneurs = this.entrepreneurs.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePaginatedEntrepreneurs();
  }

  openAdminModal() {
    this.isAdminModalOpen = true;
  }

  closeAdminModal() {
    this.isAdminModalOpen = false;
  }

}
