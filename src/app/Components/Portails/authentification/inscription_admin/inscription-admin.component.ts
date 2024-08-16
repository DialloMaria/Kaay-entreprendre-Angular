import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../Services/auth.service';
import { DomaineModel } from '../../../../Models/domaines.model';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './inscription-admin.component.html',
  styleUrls: ['./inscription-admin.component.css']
})
export class InscriptionComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  registrationForm: FormGroup;
  domaines: DomaineModel[] = []; // Utiliser le type Domaine


  constructor() {
    this.registrationForm = this.fb.group({
      nom: [''],
      prenom: [''],
      adresse: [''],
      telephone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      specialisation: [''],
      biographie: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


  // ngOnInit(): void {
  //   this.authService.getSpecialisations().subscribe(
  //     (data: DomaineModel[]) => {
  //       console.log('Domaines chargés:', data);
  //       this.domaines = data;
  //     },
  //     (error) => {
  //       console.error('Erreur lors du chargement des domaines:', error);
  //     }
  //   );
  // }
  ngOnInit(): void {
    this.authService.getSpecialisations().subscribe(
      (response: any) => {
        // Assurez-vous de bien extraire les domaines de la réponse
        this.domaines = response.data;
        console.log('Domaines chargés:', this.domaines);
      },
      (error) => {
        console.error('Erreur lors du chargement des domaines:', error);
      }
    );
  }



  // registerAdmin() {
  //   if (this.registrationForm.valid) {
  //     const userObject = this.registrationForm.value;
  //     this.authService.registerAdmin(userObject).subscribe(
  //       (response: any) => {
  //         console.log(response);
  //         this.router.navigate(['/login']);
  //       },
  //       (error) => {
  //         console.error('Erreur lors de l\'inscription:', error);
  //       }
  //     );
  //   } else {
  //     console.error('Le formulaire est invalide.');
  //   }
  // }
}
