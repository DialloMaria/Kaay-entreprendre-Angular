import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../../../services/message.service';

@Component({
  selector: 'app-message-forum-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './message-forum-list.component.html',
  styleUrls: ['./message-forum-list.component.css']
})
export class MessageForumListComponent implements OnInit {
  messages: any[] = [];
  forumId!: number;
  newMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.forumId = +id; // Convertir en nombre
      this.loadMessages();
    } else {
      console.error('Forum ID is missing in the route parameters');
    }
  }

  loadMessages(): void {
    const storedMessages = localStorage.getItem(`forum_${this.forumId}_messages`);
    this.messages = storedMessages ? JSON.parse(storedMessages) : [];
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      const message = {
        forum_id: this.forumId,
        contenu: this.newMessage,
        nom: 'Utilisateur' 
      };
      this.messageService.sendMessage(message).subscribe(() => {
        this.messages.push(message);
        this.newMessage = '';
        this.saveMessageToLocalStorage(message);
      });
    }
  }

  saveMessageToLocalStorage(message: any): void {
    const storedMessages = localStorage.getItem(`forum_${this.forumId}_messages`);
    const messages = storedMessages ? JSON.parse(storedMessages) : [];
    messages.push(message);
    localStorage.setItem(`forum_${this.forumId}_messages`, JSON.stringify(messages));
  }
}
