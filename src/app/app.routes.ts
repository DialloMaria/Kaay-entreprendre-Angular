import { Routes } from '@angular/router';
import { DomaineListComponent } from './Components/Super-admin/Domaines/domaine-list/domaine-list.component';
import { FormDomaineListComponent } from './Components/Super-admin/Domaines/form-domaine-list/form-domaine-list.component';

export const routes: Routes = [

// Redirection par défaut vers la liste des domaines
  { path: '', redirectTo: '/domaines', pathMatch: 'full' },

  // Liste des domaines
  { path: 'domaines', component: DomaineListComponent },

 // Ajout d'un nouveau domaine
  { path: 'domaines/new', component: FormDomaineListComponent },

 // Modification d'un domaine existant
  { path: 'domaines/edit/:id', component: FormDomaineListComponent },

];
