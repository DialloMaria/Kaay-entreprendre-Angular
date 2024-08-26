import { Routes } from '@angular/router';
import { ConnexionComponent } from './Components/Portails/authentification/connexion/connexion.component';
import { InscriptionComponent } from './Components/Portails/authentification/inscription/inscription.component';
import { AdministrationGuard } from './Guard/administration-guard';
import { DashboardAdminComponent } from './Components/Administrateurs/dashboard-admin/dashboard-admin.component';
import { DashboardSuperAdminComponent } from './Components/Super-admin/dashboard-super-admin/dashboard-super-admin.component';
import { DashboardEntrepreneurComponent } from './Components/Entrepreneurs/dashboard-entrepreneur/dashboard-entrepreneur.component';
import { CategorieListComponent } from './Components/Super-admin/Categories/categorie-list/categorie-list.component';
import { CategorieServiceComponent } from './Components/Super-admin/Categories/categorie-service/categorie-service.component';
import { CategorieEntrepreneurComponent } from './Components/Super-admin/Categories/categorie-entrepreneur/categorie-entrepreneur.component';
import { ListeAdminComponent } from './Components/Super-admin/Admin/liste-admin/liste-admin.component';
import { EvenementListComponent } from './Components/Super-admin/Evenements/evenement-list/evenement-list.component';
import { ListEntrepreneurComponent } from './Components/Super-admin/Entrepreneurs/liste-entrepreneur/liste-entrepreneur.component';
import { DomaineListComponent } from './Components/Super-admin/Domaines/domaine-list/domaine-list.component';
import { FormDomaineListComponent } from './Components/Super-admin/Domaines/form-domaine-list/form-domaine-list.component';
 import { EntrepreneurGuard } from './Guard/entrepreneur.guard';
import { CommentairesGuidesListService } from './Services/commentaires-guides-list.service';
import { EvenementComponent } from './Components/Entrepreneurs/Evenement/evenement.component';
import { EvenementDetailsComponent } from './Components/Entrepreneurs/Evenement/evenement-details/evenement-details.component';
import { ListesEntrepreneurComponent } from './Components/Administrateurs/Entrepreneurs/liste-entrepreneur/liste-entrepreneur.component';
import { EvenementsListComponent } from './Components/Administrateurs/evenement-list/evenement-list.component';
import { InscriptionAdminComponent } from './Components/Portails/authentification/inscription_admin/inscription-admin.component';

import { InscritDomaineComponent } from './Components/Entrepreneurs/inscrit-domaine/inscrit-domaine.component';
import { CategorieComponent } from './Components/Entrepreneurs/categorie/categorie.component';

export const routes: Routes = [


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
  {path: 'super-admin/admins/inscrire', component: InscriptionAdminComponent, canActivate: [AdministrationGuard]},
  //
  {path: 'super-admin/entrepreneurs', component: ListEntrepreneurComponent, canActivate: [AdministrationGuard]},
  {path: 'super-admin/evenements', component: EvenementListComponent, canActivate: [AdministrationGuard]},


  {path: 'admin/entrepreneurs', component: ListesEntrepreneurComponent, canActivate: [AdministrationGuard]},
  {path: 'admin/evenements', component: EvenementsListComponent, canActivate: [AdministrationGuard]},


// Redirection par défaut vers la liste des domaines
  { path: '', redirectTo: '/domaines', pathMatch: 'full' },

  // Liste des domaines
  { path: 'domaines', component: DomaineListComponent },

 // Ajout d'un nouveau domaine
  { path: 'domaines/new', component: FormDomaineListComponent },

 // Modification d'un domaine existant
  { path: 'domaines/edit/:id', component: FormDomaineListComponent },
  // {path: 'admin', component: AdministrationComponent, canActivate: [AdministrationGuard]},
  // {path: '**', component: PageNotFoundComponent}

  //la route LIST-COMMENTAIRES
  {path:'commentaires',component:CommentairesGuidesListService},
  //la route AJOUT-MODIFIER

   //La route Pour Evenement
   {path:'entrepreneur/evenements',component:EvenementComponent},
   {path:'entrepreneur/evenements/:id',component:EvenementDetailsComponent},


// la route pour s'ncrire dans une domaine
  {path:'entrepreneurInscript/domaine',component:InscritDomaineComponent},


];

