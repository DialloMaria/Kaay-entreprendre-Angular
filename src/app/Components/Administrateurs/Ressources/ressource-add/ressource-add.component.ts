import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RessourceService } from '../../../../services/ressource.service';
import { GuideService } from '../../../../services/guide.service';
import { Guide } from '../../../../models/guide.model';
import { Ressource } from '../../../../models/ressource.model';

@Component({
  selector: 'app-ressource-add',
  standalone: true,
  templateUrl: './ressource-add.component.html',
  styleUrls: ['./ressource-add.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule] // Import necessary modules
})
export class RessourceAddComponent implements OnInit {
  addRessourceForm: FormGroup;
  guides: Guide[] = [];
  @Output() resourceAdded = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private ressourceService: RessourceService,
    private guideService: GuideService
  ) {
    this.addRessourceForm = this.fb.group({
      titre: ['', [Validators.required]],
      description: ['', [Validators.required]],
      lien: ['', [Validators.required]],
      type: ['', [Validators.required]],
      guideId: [null, [Validators.required]],
      createdBy: [1] // Assuming a default value, or you might need to set this dynamically
    });
  }

  ngOnInit(): void {
    this.loadGuides();
  }

  private loadGuides(): void {
    this.guideService.getGuides().subscribe(
      (guides: Guide[]) => {
        this.guides = guides;
      },
      (error: any) => {
        console.error('Erreur lors du chargement des guides:', error.message);
      }
    );
  }

  onSubmit(): void {
    if (this.addRessourceForm.valid) {
      this.ressourceService.addRessource(this.addRessourceForm.value).subscribe(
        () => {
          this.resourceAdded.emit();
          this.addRessourceForm.reset();
        },
        (error: any) => {
          console.error('Erreur lors de l\'ajout de la ressource:', error.message);
        }
      );
    }
  }
}
