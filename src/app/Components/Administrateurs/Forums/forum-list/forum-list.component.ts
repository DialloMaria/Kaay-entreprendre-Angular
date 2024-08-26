import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Forum } from './../../../../forum.model'; 
import { ForumService } from './../../../../services/forum.service';

@Component({
  selector: 'app-forum-list',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './forum-list.component.html',
  styleUrls: ['./forum-list.component.css']
})
export class ForumListComponent implements OnInit {
  forums$: Observable<Forum[]> = of([]);

  constructor(private forumService: ForumService) {}

  ngOnInit(): void {
    this.loadForums();
  }

  loadForums(): void {
    this.forums$ = this.forumService.getForums().pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération des forums', error);
        return of([]);
      })
    );
  }
}
