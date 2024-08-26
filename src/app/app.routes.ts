import { DomaineListComponent } from './Components/Super-admin/Domaines/domaine-list/domaine-list.component';
import { FormDomaineListComponent } from './Components/Super-admin/Domaines/form-domaine-list/form-domaine-list.component';
import { Routes } from '@angular/router';
import { ConnexionComponent } from './Components/Portails/authentification/connexion/connexion.component';
import { InscriptionComponent } from './Components/Portails/authentification/inscription/inscription.component';
import { AdministrationGuard } from './Guard/administration-guard';
import { DashboardAdminComponent } from './Components/Administrateurs/dashboard-admin/dashboard-admin.component';
import { DashboardSuperAdminComponent } from './Components/Super-admin/dashboard-super-admin/dashboard-super-admin.component';
import { DashboardEntrepreneurComponent } from './Components/Entrepreneurs/dashboard-entrepreneur/dashboard-entrepreneur.component';
import { EntrepreneurGuard } from './Guard/entrepreneur.guard';
import { SousDomaineListComponent } from './Components/Super-admin/Sous-domaines/sous-domaine-list/sous-domaine-list.component';
import { CategorieListComponent } from './Components/Super-admin/Categories/categorie-list/categorie-list.component';
import { CategorieServiceComponent } from './Components/Super-admin/Categories/categorie-service/categorie-service.component';
import { CategorieEntrepreneurComponent } from './Components/Super-admin/Categories/categorie-entrepreneur/categorie-entrepreneur.component';
import { ListeAdminComponent } from './Components/Super-admin/Admin/liste-admin/liste-admin.component';
import { EvenementListComponent } from './Components/Super-admin/Evenements/evenement-list/evenement-list.component';
import { ListEntrepreneurComponent } from './Components/Super-admin/Admin copy/liste-entrepreneur/liste-entrepreneur.component';
import { AccueilComponent } from './Components/Entrepreneurs/accueil/accueil.component';

// Combinez toutes les routes en un seul tableau
export const routes: Routes = [
  // Redirection par défaut vers la liste des domaines
  // {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
  {path: 'login', component: ConnexionComponent},
  {path: 'register', component: InscriptionComponent},
  {path: 'dashboard/admin', component: DashboardAdminComponent, canActivate: [AdministrationGuard]},
  {path: 'dashboard/super-admin', component: DashboardSuperAdminComponent, canActivate: [AdministrationGuard]},
  {path: 'dashboard/entrepreneur', component: DashboardEntrepreneurComponent, canActivate: [EntrepreneurGuard]},


  // Super Admin
  {path: 'super-admin/categories', component: CategorieListComponent, canActivate: [AdministrationGuard]},
  {path: 'super-admin/categories/:id', component: CategorieServiceComponent, canActivate: [AdministrationGuard]},
  {path: 'super-admin/categories/enntrpreneurs/:id', component: CategorieEntrepreneurComponent, canActivate: [AdministrationGuard]},
  {path: 'super-admin/admins', component: ListeAdminComponent, canActivate: [AdministrationGuard]},
  {path: 'super-admin/entrepreneurs', component: ListEntrepreneurComponent, canActivate: [AdministrationGuard]},
  {path: 'super-admin/evenements', component: EvenementListComponent, canActivate: [AdministrationGuard]},


// Redirection par défaut vers la liste des domaines
  // { path: '', redirectTo: '/accueil', pathMatch: 'full' },

  { path: 'accueil', component: AccueilComponent },

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


  { path: 'sousdomaines', component: SousDomaineListComponent },
  { path: 'sousdomaines/new', component: SousDomaineListComponent },
  { path: 'sousomaines/edit/:id', component: FormDomaineListComponent },

  // Vous pouvez également ajouter une route pour la page 404 ici si besoin
  // { path: '**', component: PageNotFoundComponent }
];
