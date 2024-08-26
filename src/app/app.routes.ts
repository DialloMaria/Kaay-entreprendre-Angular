import { Route } from '@angular/router';
import { ForumListComponent } from './Components/Administrateurs/Forums/forum-list/forum-list.component';

export const routes: Route[] = [
  { path: '', redirectTo: '/forums', pathMatch: 'full' },
  { path: 'forums', component: ForumListComponent },
  // autres routes ici
];
