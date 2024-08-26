import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  styleUrls: ['./forum-list.component.css']
})
export class ForumListComponent implements OnInit {
  forums$: Observable<any[]> = of([]); // Valeur par défaut vide
  messages: any[] = [];
  newMessage: { [key: number]: string } = {};

  constructor(private forumService: ForumService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadForums();
  }

  loadForums(): void {
    this.forums$ = this.forumService.getForums();
  }

  loadMessages(forumId: number): void {
    this.messageService.getMessages(forumId).subscribe(
      (response) => {
        if (Array.isArray(response)) {
          this.messages = response;
          console.log('Messages récupérés pour le forum:', forumId, this.messages); 
        } else {
          this.messages = [];
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des messages:', error);
      }
    );
  }

  sendMessage(forumId: number): void {
    const messageContent = this.newMessage[forumId];
    const userId = 1; 
  
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
          this.loadMessages(forumId); 
        },
        (error) => {
          console.error('Erreur lors de l\'envoi du message:', error);
        }
      );
    }
  }

  getMessagesForForum(forumId: number): any[] {
    if (Array.isArray(this.messages)) {
      return this.messages.filter(message => message.forum_id === forumId);
    } else {
      return []; 
    }
  }
}
