import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentaireService } from '../../../../services/commentaire.service';
import { Commentaire } from '../../../../models/commentaire.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-commentaire-guides-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './commentaire-guides-list.component.html',
  styleUrls: ['./commentaire-guides-list.component.css']
})
export class CommentaireGuidesListComponent implements OnInit {
  @Input() guideId!: number; // Ensure this is set before using
  commentaires: Commentaire[] = [];
  nouveauCommentaire: Commentaire = { contenu: '', guide_id: 0, created_by: 1 };

  constructor(private commentaireService: CommentaireService) {}

  ngOnInit(): void {
    this.nouveauCommentaire.guide_id = this.guideId; // Set guide_id on initialization
    this.loadCommentaires();
  }

  private loadCommentaires(): void {
    this.commentaireService.getCommentairesByGuideId(this.guideId).subscribe(
      (commentaires: Commentaire[]) => {
        this.commentaires = commentaires;
      },
      (error: HttpErrorResponse) => {
        console.error('Erreur lors du chargement des commentaires:', error.message);
      }
    );
  }

  ajouterCommentaire(): void {
    if (this.nouveauCommentaire.contenu.trim() && this.guideId) {
      this.nouveauCommentaire.guide_id = this.guideId;
      this.commentaireService.addCommentaire(this.nouveauCommentaire).subscribe(
        (commentaire: Commentaire) => {
          this.commentaires.push(commentaire);
          this.nouveauCommentaire = { contenu: '', guide_id: this.guideId, created_by: 1 }; // Reset the form
        },
        (error: HttpErrorResponse) => {
          console.error('Erreur lors de l\'ajout du commentaire:', error.message);
        }
      );
    }
  }
}
