import { Component, OnInit } from '@angular/core';
import { SuperAdminLayoutComponent } from "../../layouts/super-admin-layout/super-admin-layout.component";
import { NavbarComponent } from "../../../Administrateurs/layouts/navbar/navbar.component";
import { CommonModule } from '@angular/common';
interface Entrepreneur {
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  adresse: string;
}
@Component({
  selector: 'app-categorie-list',
  standalone: true,
  imports: [SuperAdminLayoutComponent, NavbarComponent, CommonModule],
  templateUrl: './categorie-entrepreneur.component.html',
  styleUrl: './categorie-entrepreneur.component.css'
})
export class CategorieEntrepreneurComponent implements OnInit {
  entrepreneurs: Entrepreneur[] = [
    { nom: 'Amadou', prenom: 'Barro', telephone: '77 000 00 00', email: 'email.com', adresse: 'Dakar, Pikine' },
    { nom: 'Amadou', prenom: 'Barro', telephone: '77 000 00 00', email: 'email.com', adresse: 'Dakar, Pikine' },
    { nom: 'Simplon', prenom: 'Barro', telephone: '77 000 00 00', email: 'email.com', adresse: 'Dakar, Pikine' },
    { nom: 'Amadou', prenom: 'Barro', telephone: '77 000 00 00', email: 'email.com', adresse: 'Dakar, Pikine' },
    // Add more entrepreneurs here...
  ];

  paginatedEntrepreneurs: Entrepreneur[] = [];
  pageSize = 2;  // Number of entrepreneurs per page
  currentPage = 1;
  totalPages = 0;

  ngOnInit() {
    this.totalPages = Math.ceil(this.entrepreneurs.length / this.pageSize);
    this.updatePaginatedEntrepreneurs();
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
}
