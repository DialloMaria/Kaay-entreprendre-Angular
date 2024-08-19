// import { SousDomaineService } from './../../../../services/sous-domaine.service';
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { SousDomaine } from '../../../../Models/SousDomaine.model';

// @Component({
//   selector: 'app-sous-domaine-form',
//   templateUrl: './sous-domaine-form.component.html',
//   styleUrls: ['./sous-domaine-form.component.css']
// })
// export class SousDomaineFormComponent implements OnInit {
//   sousDomaine: SousDomaine = { nom: '', domaine_id: 0 };
//   isEditMode = false;

//   constructor(
//     private sousDomaineService: SousDomaineService,
//     private route: ActivatedRoute,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     const id = this.route.snapshot.paramMap.get('id');
//     if (id) {
//       this.isEditMode = true;
//       this.getSousDomaine(parseInt(id, 10));
//     }
//   }

//   getSousDomaine(id: number): void {
//     this.sousDomaineService.getSousDomaine(id).subscribe({
//       next: (data: SousDomaine) => {
//         this.sousDomaine = data;
//       },
//       error: (err) => {
//         console.error('Erreur lors de la récupération du sous-domaine:', err);
//       }
//     });
//   }

//   saveSousDomaine(): void {
//     if (this.isEditMode) {
//       this.sousDomaineService.updateSousDomaine(this.sousDomaine.id!, this.sousDomaine).subscribe({
//         next: () => {
//           this.router.navigate(['/sous-domaines']);
//         },
//         error: (err) => {
//           console.error('Erreur lors de la mise à jour du sous-domaine:', err);
//         }
//       });
//     } else {
//       this.sousDomaineService.createSousDomaine(this.sousDomaine).subscribe({
//         next: () => {
//           this.router.navigate(['/sous-domaines']);
//         },
//         error: (err) => {
//           console.error('Erreur lors de la création du sous-domaine:', err);
//         }
//       });
//     }
//   }
// }
