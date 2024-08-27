import { Route } from '@angular/router';
import { ForumListComponent } from './Components/Administrateurs/Forums/forum-list/forum-list.component';
import { MessageForumListComponent } from './Components/Entrepreneurs/Messages-forum/message-forum-list/message-forum-list.component';

export const routes: Route[] = [
  { path: '', redirectTo: '/forums', pathMatch: 'full' },
  { path: 'forums', component: ForumListComponent },
  { path: 'messages-forum/:forumId', component: MessageForumListComponent }, 
];
