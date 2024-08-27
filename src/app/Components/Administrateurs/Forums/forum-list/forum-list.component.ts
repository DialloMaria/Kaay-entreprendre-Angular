import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Forum } from './../../../../forum.model'; 
import { ForumService } from './../../../../services/forum.service';
import { MessageService } from './../../../../services/message.service';

@Component({
  selector: 'app-forum-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule
  ],
  templateUrl: './forum-list.component.html',
  styleUrls: ['./forum-list.component.css'],
  providers: [DatePipe]
})
export class ForumListComponent implements OnInit {
  forums$: Observable<Forum[]> = of([]);
  messages: { [key: number]: any[] } = {};
  newMessage: { [key: number]: string } = {};

  constructor(
    private forumService: ForumService,
    private messageService: MessageService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.loadForums();
  }

  loadForums(): void {
    this.forums$ = this.forumService.getForums();
    this.forums$.subscribe(forums => console.log('Forums chargés:', forums));
  }

  loadMessages(forumId: number): void {
    console.log('Chargement des messages pour le forum ID:', forumId);
    this.messageService.getMessages(forumId).subscribe(
      (response) => {
        console.log('Réponse reçue:', response);
        // Vérifiez si 'data' est un tableau
        if (response && Array.isArray(response.data)) {
          this.messages[forumId] = response.data;
        } else {
          console.warn('La réponse n\'a pas la structure attendue:', response);
          this.messages[forumId] = [];
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des messages:', error);
      }
    );
  }
  
  sendMessage(forumId: number): void {
    const messageContent = this.newMessage[forumId];
    const userId = 1; // Remplacez ceci par l'ID de l'utilisateur connecté
  
    if (messageContent) {
      const messageData = {
        nom: messageContent,
        forum_id: forumId,
        created_by: userId,
        modified_by: userId,
      };
  
      this.messageService.sendMessage(messageData).subscribe(
        () => {
          this.newMessage[forumId] = '';
          this.loadMessages(forumId); // Recharger les messages après l'envoi
        },
        (error) => {
          console.error('Erreur lors de l\'envoi du message:', error);
        }
      );
    }
  }

  getMessagesForForum(forumId: number): any[] {
    const messages = this.messages[forumId] || [];
    console.log('Messages pour le forum', forumId, ':', messages);
    return messages;
  }
}
