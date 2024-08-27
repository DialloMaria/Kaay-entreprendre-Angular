import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-message-forum-list',
  templateUrl: './message-forum-list.component.html',
  styleUrls: ['./message-forum-list.component.css']
})
export class MessageForumListComponent implements OnInit {
  forumId: string | null = null;
  messages: any[] = []; // Assurez-vous de définir correctement le type des messages

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Récupérer le forumId depuis les paramètres de route
    this.route.paramMap.subscribe(params => {
      this.forumId = params.get('forumId');
      if (this.forumId) {
        console.log(`Forum ID from route: ${this.forumId}`);
        // Vous pouvez maintenant utiliser le forumId pour récupérer les messages
        this.loadMessages(this.forumId);
      } else {
        console.error('Forum ID is missing in the route parameters');
      }
    });
  }

  loadMessages(forumId: string): void {
    // Implémentez ici la logique pour charger les messages depuis l'API
  }
}
