import { SousDomaineService } from './../../../../services/sous-domaine.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SousDomaine } from '../../../../Models/SousDomaine.model';

@Component({
  selector: 'app-sous-domaine-list',
  templateUrl: './sous-domaine-list.component.html',
  styleUrls: ['./sous-domaine-list.component.css']
})
export class SousDomaineListComponent implements OnInit {
  sousDomaines: SousDomaine[] = [];

  constructor(private sousDomaineService: SousDomaineService, private router: Router) {}

  ngOnInit(): void {
    this.getSousDomaines();
  }

  getSousDomaines(): void {
    this.sousDomaineService.getSousDomaines().subscribe((data: SousDomaine[]) => {
      this.sousDomaines = data;
      console.log(this.sousDomaines);
    });
  }

  editSousDomaine(id: number): void {
    this.router.navigate(['/sous-domaines/edit', id]);
  }

  // deleteSousDomaine(id: number): void {
  //   this.sousDomaineService.deleteSousDomaine(id).subscribe(() => {
  //     this.getSousDomaines();
  //   });
  // }
}
