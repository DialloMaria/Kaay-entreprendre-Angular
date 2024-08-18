import { Routes } from '@angular/router';
import { ForumListComponent } from './Components/Administrateurs/Forums/forum-list/forum-list.component';
import { MessageForumListComponent } from './Components/Entrepreneurs/Messages-forum/message-forum-list/message-forum-list.component';

export const routes: Routes = [
  { path: 'forums', component: ForumListComponent },
  { path: 'forums/:id/messages', component: MessageForumListComponent },
  { path: '**', redirectTo: 'forums' } // Redirection si aucune autre route ne correspond
];
