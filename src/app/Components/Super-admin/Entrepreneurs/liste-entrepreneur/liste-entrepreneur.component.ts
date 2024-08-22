import { Component, OnInit } from '@angular/core';
import { SuperAdminLayoutComponent } from "../../layouts/super-admin-layout/super-admin-layout.component";
import { NavbarComponent } from "../../../Administrateurs/layouts/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { EntrepreneurService } from '../../../../Services/entrepreneur.service';
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
  templateUrl: './liste-entrepreneur.component.html',
  styleUrl: './liste-entrepreneur.component.css'
})
export class ListEntrepreneurComponent implements OnInit {
  entrepreneurs: any[] = [];


  paginatedEntrepreneurs: Entrepreneur[] = [];
  pageSize = 2;  // Number of entrepreneurs per page
  currentPage = 1;
  totalPages = 0;

  ngOnInit() {
    this.updatePaginatedEntrepreneurs();
    this.getEntrepreneurs();

  }
  constructor(private entrepreneurService: EntrepreneurService) { }

  getEntrepreneurs(): void {
    this.entrepreneurService.getEntrepreneurs().subscribe(response => {
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
}
