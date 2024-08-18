import {  Routes } from '@angular/router';
import { DomaineListComponent } from './Components/Super-admin/Domaines/domaine-list/domaine-list.component';
import { FormDomaineListComponent } from './Components/Super-admin/Domaines/form-domaine-list/form-domaine-list.component';
import { ConnexionComponent } from './Components/Portails/authentification/connexion/connexion.component';
import { InscriptionComponent } from './Components/Portails/authentification/inscription/inscription.component';
import { AdministrationGuard } from './Guard/administration-guard';
import { DashboardAdminComponent } from './Components/Administrateurs/dashboard-admin/dashboard-admin.component';
import { DashboardSuperAdminComponent } from './Components/Super-admin/dashboard-super-admin/dashboard-super-admin.component';
import { DashboardEntrepreneurComponent } from './Components/Entrepreneurs/dashboard-entrepreneur/dashboard-entrepreneur.component';
import { EntrepreneurGuard } from './Guard/entrepreneur.guard';
import { SousDomaineListComponent } from './Components/Super-admin/Sous-domaines/sous-domaine-list/sous-domaine-list.component';

// Combinez toutes les routes en un seul tableau
export const routes: Routes = [
  // Redirection par défaut vers la liste des domaines
  { path: '', redirectTo: '/domaines', pathMatch: 'full' },

  // Liste des domaines
  { path: 'domaines', component: DomaineListComponent },

  // Ajout d'un nouveau domaine
  { path: 'domaines/new', component: FormDomaineListComponent },

  // Modification d'un domaine existant
  { path: 'domaines/edit/:id', component: FormDomaineListComponent },

  // Authentification
  { path: 'login', component: ConnexionComponent },
  { path: 'register', component: InscriptionComponent },

  // Dashboards avec des gardes pour sécuriser les routes
  { path: 'dashboard/admin', component: DashboardAdminComponent, canActivate: [AdministrationGuard] },                  
  { path: 'dashboard/super-admin', component: DashboardSuperAdminComponent, canActivate: [AdministrationGuard] },
  { path: 'dashboard/entrepreneur', component: DashboardEntrepreneurComponent, canActivate: [EntrepreneurGuard] },


  { path: 'sous-domaines', component: SousDomaineListComponent },
  { path: 'sous-domaines/new', component: SousDomaineListComponent },
  { path: 'sous-domaines/edit/:id', component: FormDomaineListComponent },

  // Vous pouvez également ajouter une route pour la page 404 ici si besoin
  // { path: '**', component: PageNotFoundComponent }
];
