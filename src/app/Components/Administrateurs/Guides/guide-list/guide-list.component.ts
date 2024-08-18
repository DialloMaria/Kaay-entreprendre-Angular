import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Importer FormsModule
import { Guide } from '../../../../models/guide.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guide-list',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Ajouter FormsModule ici
  templateUrl: './guide-list.component.html',
  styleUrls: ['./guide-list.component.css']
})
export class GuideListComponent {
  public guides: Guide[] = [];
  public comments: string[] = [];
  public newComment: string = '';

  // Déclarez la propriété resources ici
  public resources = [
    { title: 'Entreprenariat au Sénégal', content: 'Le lorem ipsum est, en imprimerin Le lorem ipsum est,', showContent: false },
    { title: 'Entreprenariat au Sénégal', content: 'Le lorem ipsum est, en imprimerin Le lorem ipsum est,', showContent: false },
    { title: 'Entreprenariat au Sénégal', content: 'Le lorem ipsum est, en imprimerin Le lorem ipsum est,', showContent: false },
    { title: 'Entreprenariat au Sénégal', content: 'Le lorem ipsum est, en imprimerin Le lorem ipsum est,', showContent: false },
    { title: 'Entreprenariat au Sénégal', content: 'Le lorem ipsum est, en imprimerin Le lorem ipsum est,', showContent: false },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.guides = [
      {
        id: 1,
        titre: 'Guide: Algorithmes',
        contenu: 'Le lorem ipsum est, en imprimerin Le lorem ipsum est, ',
        datepublication: '2024-08-18',
        media: 'assets/images/imageGUIDE1.png',
        auteur: 'Auteur 1',
        domaine_id: 1,
        user_id: 101
      },
    ];
  }

  public steps: string[] = ['Étape 1', 'Étape 2', 'Étape 3', 'Étape 4', 'Étape 5'];
  public selectedStep: string | null = null;
  public isLastStepSelected: boolean = false;

  selectStep(step: string) {
    this.selectedStep = step;
    this.isLastStepSelected = (step === 'Étape 5');
  }

  toggleResourceContent(resource: any) {
    resource.showContent = !resource.showContent;
  }

  completeGuide() {
    this.router.navigate(['/guide-completed']);
  }

  addComment() {
    if (this.newComment.trim()) {
      this.comments.push(this.newComment);
      this.newComment = '';
    }
  }
}
