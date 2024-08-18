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
      this.messageService.getMessages(this.forumId).subscribe((data: any[]) => {
        this.messages = data;
      });
    } else {
      console.error('Forum ID is missing in the route parameters');
    }
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      const message = {
        forumId: this.forumId,
        contenu: this.newMessage,
        nom: 'Utilisateur' 
      };
      this.messageService.sendMessage(message).subscribe(() => {
        this.messages.push(message);
        this.newMessage = '';
      });
    }
  }
}
