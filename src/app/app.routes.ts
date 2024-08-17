import { Routes } from '@angular/router';
import { ConnexionComponent } from './Components/Portails/authentification/connexion/connexion.component';
import { InscriptionComponent } from './Components/Portails/authentification/inscription/inscription.component';
import { AdministrationGuard } from './Guard/administration-guard';
import { DashboardAdminComponent } from './Components/Administrateurs/dashboard-admin/dashboard-admin.component';
import { DashboardSuperAdminComponent } from './Components/Super-admin/dashboard-super-admin/dashboard-super-admin.component';
import { DashboardEntrepreneurComponent } from './Components/Entrepreneurs/dashboard-entrepreneur/dashboard-entrepreneur.component';
import { EntrepreneurGuard } from './Guard/entrepreneur.guard';
import { CategorieListComponent } from './Components/Super-admin/Categories/categorie-list/categorie-list.component';
import { CategorieServiceComponent } from './Components/Super-admin/Categories/categorie-service/categorie-service.component';
import { CategorieEntrepreneurComponent } from './Components/Super-admin/Categories/categorie-entrepreneur/categorie-entrepreneur.component';

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


  // {path: 'admin', component: AdministrationComponent, canActivate: [AdministrationGuard]},
  // {path: '**', component: PageNotFoundComponent}
];
