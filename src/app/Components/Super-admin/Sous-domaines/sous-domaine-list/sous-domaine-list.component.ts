import { SousDomaineService } from './../../../../services/sous-domaine.service';
import { SousDomaine } from '../../../../Models/SousDomaine.model';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { SuperAdminService } from '../../../../Services/super-admin.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sous-domaine-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sous-domaine-list.component.html',
  styleUrls: ['./sous-domaine-list.component.css']
})
export class SousDomaineListComponent implements OnInit, OnChanges {
  @Input() selectedDomaine: any;
  domaines: any[] = [];
  sousDomaines: any[] = [];
  selectedSousDomaines: any[] = [];
  selectedDomaineName: string = '';
  selectedEntrepreneurs: any[] = [];

  constructor(
    private superAdminService: SuperAdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSousDomaines();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedDomaine'] && this.selectedDomaine) {
      this.getSousDomaines(this.selectedDomaine.id);
    }
  }

  getSousDomaines(domaineId: number): void {
    this.superAdminService.loadSousDomaines(domaineId).subscribe((response: any) => {
      this.sousDomaines = response.sousDomaines;
      this.selectedDomaineName = this.domaines.find(d => d.id === domaineId)?.nom || '';
      this.selectedSousDomaines = this.sousDomaines;
    },
    error => {
      console.error('Erreur lors de la récupération des sous-domaines:', error);
    });
  }

  loadSousDomaines(): void {
    this.superAdminService.getSousDomaines().subscribe(
      (response: any) => {
        this.sousDomaines = response.sousDomaines;
      },
      error => {
        console.error('Erreur lors de la récupération des sous-domaines:', error);
      }
    );
  }

  showEntrepreneurs(sousDomaineId: number): void {
    this.superAdminService.getEntrepreneursBySousDomaine(sousDomaineId).subscribe(
      (response: any) => {
        this.selectedEntrepreneurs = response.entrepreneurs;
      },
      error => {
        console.error('Erreur lors de la récupération des entrepreneurs:', error);
      }
    );
  }
}



// @Component({
//   selector: 'app-sous-domaine-list',
//   templateUrl: './sous-domaine-list.component.html',
//   styleUrls: ['./sous-domaine-list.component.css']
// })
// export class SousDomaineListComponent implements OnInit {
//   sousDomaines: SousDomaine[] = [];

//   constructor(private sousDomaineService: SousDomaineService, private router: Router) {}

//   ngOnInit(): void {
//     this.getSousDomaines();
//   }

//   getSousDomaines(): void {
//     this.sousDomaineService.getSousDomaines().subscribe((data: SousDomaine[]) => {
//       this.sousDomaines = data;
//       console.log(this.sousDomaines);
//     });
//   }

//   editSousDomaine(id: number): void {
//     this.router.navigate(['/sous-domaines/edit', id]);
//   }

//   // deleteSousDomaine(id: number): void {
//   //   this.sousDomaineService.deleteSousDomaine(id).subscribe(() => {
//   //     this.getSousDomaines();
//   //   });
//   // }
