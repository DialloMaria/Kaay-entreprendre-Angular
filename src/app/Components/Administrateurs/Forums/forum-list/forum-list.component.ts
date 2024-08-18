import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importez CommonModule

@Component({
  selector: 'app-forum-list',
  standalone: true,
  imports: [RouterModule, CommonModule], 
  templateUrl: './forum-list.component.html',
  styleUrls: ['./forum-list.component.css']
})
export class ForumListComponent implements OnInit {
  forums: any[] = [
    { id: 1, titre: 'Forum 1', description: 'Description du Forum 1' },
    { id: 2, titre: 'Forum 2', description: 'Description du Forum 2' },
    { id: 3, titre: 'Forum 3', description: 'Description du Forum 3' }
  ];

  constructor() {}

  ngOnInit(): void {
    // Initialisation manuelle des forums pour test
    // this.forumService.getForums().subscribe((data: any[]) => {
    //   this.forums = data;
    // });
  }
}
