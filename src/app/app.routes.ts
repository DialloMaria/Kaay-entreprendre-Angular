import { Routes } from '@angular/router';
import { GuideListComponent } from './Components/Administrateurs/Guides/guide-list/guide-list.component';
import { GuideAddComponent } from './Components/Administrateurs/Guides/guide-add/guide-add.component';
import { GuideEditComponent } from './Components/Administrateurs/Guides/guide-edit/guide-edit.component';
import { GuideDetailComponent } from './Components/Administrateurs/Guides/guide-detail/guide-detail.component';
import { GuideCompletedComponent } from './Components/Administrateurs/Guides/guide-completed/guide-completed.component';

export const routes: Routes = [
  { path: '', component: GuideListComponent },  
  { path: 'guides', component: GuideListComponent },
  { path: 'guides/add', component: GuideAddComponent },
  { path: 'guides/edit/:id', component: GuideEditComponent },
  { path: 'guides/detail/:id', component: GuideDetailComponent },
  { path: 'guide-completed', component: GuideCompletedComponent }
];
