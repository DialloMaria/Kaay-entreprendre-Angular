import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule } from '@angular/forms';
import { CommentairesGuidesListService } from '../../../../Services/commentaires-guides-list.service'; 
import { CommentairesGuidesList } from '../../../../Models/commentaires-guides-list'; 
import { AuthService } from '../../../../Services/auth.service';
import { Router } from '@angular/router';
import { Route } from '@angular/router';
import { NavbarEntrepreneurComponent } from '../../layout/navbar-entrepreneur/navbar-entrepreneur.component';
@Component({
  selector: 'app-commentaire-guides',
  standalone: true,
  imports: [CommonModule, FormsModule,NavbarEntrepreneurComponent],
  templateUrl: './commentaire-guides-list.component.html',
  styleUrls: ['./commentaire-guides-list.component.css']
})
export class CommentaireGuidesComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  commentaires: CommentairesGuidesList[] = [];
  currentCommentaire: CommentairesGuidesList = { contenu: '' };
  isEditMode: boolean = false;
  constructor(private commentaireService: CommentairesGuidesListService ) {}

  ngOnInit(): void {
    this.loadCommentaires();
  }

  loadCommentaires(): void {
    this.commentaireService.getCommentaires().subscribe(
      (data) => {
        this.commentaires = data;
      },
      (error) => {
        console.error('Error fetching comments:', error);
      }
    );
  }

  addOrUpdateCommentaire(): void {
    if (this.isEditMode) {
      this.commentaireService.updateCommentaire(this.currentCommentaire._id!, this.currentCommentaire).subscribe(
        () => this.loadCommentaires(),
        (error) => console.error('Error updating comment:', error)
      );
      this.isEditMode = false;
    } else {
      this.commentaireService.createCommentaire(this.currentCommentaire).subscribe(
        () => this.loadCommentaires(),
        (error) => console.error('Error creating comment:', error)
      );
    }
    this.currentCommentaire = { contenu: '' };
  }

  editCommentaire(commentaire: CommentairesGuidesList): void {
    this.currentCommentaire = { ...commentaire };
    this.isEditMode = true;
  }

  deleteCommentaire(id: number): void {
    this.commentaireService.deleteCommentaire(id).subscribe(
      () => this.loadCommentaires(),
      (error) => console.error('Error deleting comment:', error)
    );
  }
}