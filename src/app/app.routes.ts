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
import { DomaineListComponent } from './Components/Super-admin/Domaines/domaine-list/domaine-list.component';
import { FormDomaineListComponent } from './Components/Super-admin/Domaines/form-domaine-list/form-domaine-list.component';
import { CommentairesGuidesListService } from './Services/commentaires-guides-list.service';
import { EvenementComponent } from './Components/Entrepreneurs/Evenement/evenement.component';
import { EvenementDetailsComponent } from './Components/Entrepreneurs/Evenement/evenement-details/evenement-details.component';
import { ListesEntrepreneurComponent } from './Components/Administrateurs/Entrepreneurs/liste-entrepreneur/liste-entrepreneur.component';
import { EvenementsListComponent } from './Components/Administrateurs/evenement-list/evenement-list.component';
import { InscriptionAdminComponent } from './Components/Portails/authentification/inscription_admin/inscription-admin.component';
import { SuperAdminGuard } from './Guard/super-admin.guard';

import { InscritDomaineComponent } from './Components/Entrepreneurs/inscrit-domaine/inscrit-domaine.component';
import { CategorieComponent } from './Components/Entrepreneurs/categorie/categorie.component';
import { ListEntrepreneurComponent } from './Components/Super-admin/Entrepreneurs/liste-entrepreneur/liste-entrepreneur.component';
import { GuideListComponent } from './Components/Administrateurs/Guides/guide-list/guide-list.component';
import { RessourceListComponent } from './Components/Administrateurs/Ressources/ressource-list/ressource-list.component';
import { TemoignagesComponent } from './Components/Entrepreneurs/temoignages/temoignages.component';

import { ListeInscritComponent } from './Components/Super-admin/Evenements/liste-inscrit/liste-inscrit.component';


// Combinez toutes les routes en un seul tableau
export const routes: Routes = [
    


  // Redirection par défaut vers la liste des domaines
  // {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
  {path: 'login', component: ConnexionComponent},
  {path: 'register', component: InscriptionComponent},
  {path: 'dashboard/admin', component: DashboardAdminComponent, canActivate: [AdministrationGuard]},
  {path: 'dashboard/super-admin', component: DashboardSuperAdminComponent, canActivate: [SuperAdminGuard]},
  {path: 'dashboard/entrepreneur', component: DashboardEntrepreneurComponent, canActivate: [EntrepreneurGuard]},


   // Super Admin
   {path: 'super-admin/categories', component: CategorieListComponent, canActivate: [SuperAdminGuard]},
   {path: 'super-admin/categories/:id', component: CategorieServiceComponent, canActivate: [SuperAdminGuard]},
   {path: 'super-admin/categories/entrepreneurs/:id', component: CategorieEntrepreneurComponent, canActivate: [SuperAdminGuard]},
   {path: 'super-admin/admins', component: ListeAdminComponent, canActivate: [SuperAdminGuard]},
   {path: 'super-admin/admins/inscrire', component: InscriptionAdminComponent, canActivate: [SuperAdminGuard]},
   //
   {path: 'super-admin/entrepreneurs', component: ListEntrepreneurComponent, canActivate: [SuperAdminGuard]},
   {path: 'super-admin/evenements', component: EvenementListComponent, canActivate: [SuperAdminGuard]},

   {path: 'dashboard/admin', component: DashboardAdminComponent, canActivate: [AdministrationGuard, SuperAdminGuard]},
   {path: 'admin/entrepreneurs', component: ListesEntrepreneurComponent, canActivate: [AdministrationGuard]},
   {path: 'admin/evenements', component: EvenementsListComponent, canActivate: [AdministrationGuard]},
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


   // Guides
  { path: '', component: GuideListComponent },
  { path: 'guides', component: GuideListComponent },
  // { path: 'guides/add', component: GuideAddComponent },
  // { path: 'guides/edit/:id', component: GuideEditComponent },
  // { path: 'guides/detail/:id', component: GuideDetailComponent },
  // { path: 'guide-completed', component: GuideCompletedComponent },
  // Resources

  { path: 'resources', component: RessourceListComponent },

  // { path: 'resources/edit/:id', component: ResourceEditComponent, canActivate: [AdministrationGuard] },
  // { path: 'resources/detail/:id', component: ResourceDetailComponent, canActivate: [AdministrationGuard] },
  // Vous pouvez également ajouter une route pour la page 404 ici si besoin
  // { path: '**', component: PageNotFoundComponent }

  //route Temoignages 
  { path:'entrepreneurTemoignages',   component:TemoignagesComponent},

  //route Temoignages 

  { path:'entrepreneurTemoignages',   component:TemoignagesComponent},
  //la Route pour les personnes inscrit a une evenement 
  { path:'listInscritEvent', component:ListeInscritComponent}

];
