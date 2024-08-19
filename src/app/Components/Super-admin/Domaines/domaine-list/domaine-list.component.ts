import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Domaine } from '../../../../Models/domaine.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importer CommonModule
import { DomaineService } from '../../../../Services/domaine.service';


@Component({
  selector: 'app-domaine-list',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './domaine-list.component.html',
  styleUrls: ['./domaine-list.component.css']
})
export class DomaineListComponent  implements OnInit {
  domaines: Domaine[] = [];
  id?: number | undefined; // Initialiser avec null

  constructor(private domaineService: DomaineService, private router: Router, ) {
    this.getDomaines();
  }

  ngOnInit(): void {
    // this.id = Number(this.route.snapshot.paramMap.get('id')); // Récupérer l'ID depuis l'URL

    // if (this.id) {
    //   this.domaineService.getDomaine(this.id).subscribe((data: Domaine) => {
    //     this.domaine = data;
    //   });
    // }
  }

  // getDomaines(): void {
  //   this.domaineService.getDomaines().subscribe((data: Domaine[]) => {
  //     this.domaines = data;
  //     console.log(this.domaines);

  //    });
  // }

  getDomaines(): void {
    this.domaineService.getDomaines().subscribe((response: any) => {
      this.domaines = response.data; // ou selon la structure exacte de votre réponse
    });
  }

  getDomaine(id: number): void {
    this.domaineService.getDomaine(id).subscribe(
      (response: any) => {
        console.log(response);
        if (response) {
          this.domaines = [response];
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  editDomaine(id: number): void {
    this.router.navigate(['/domaines/edit', id]);
  }

  deleteDomaine(id: number): void {
    this.domaineService.deleteDomaine(id).subscribe(() => {
      this.getDomaines();
    });
  }
}
