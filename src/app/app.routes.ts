import { Routes } from '@angular/router';
import { ConnexionComponent } from './Components/Portails/authentification/connexion/connexion.component';
import { InscriptionComponent } from './Components/Portails/authentification/inscription/inscription.component';
import { AdminComponent } from './Components/Administrateurs/Dashboard/admin/admin.component';
import { AdministrationGuard } from './Guard/administration-guard';
import { DashboardAdminComponent } from './Components/Administrateurs/dashboard-admin/dashboard-admin.component';
import { DashboardSuperAdminComponent } from './Components/Super-admin/dashboard-super-admin/dashboard-super-admin.component';
import { DashboardEntrepreneurComponent } from './Components/Entrepreneurs/dashboard-entrepreneur/dashboard-entrepreneur.component';
import { EntrepreneurGuard } from './Guard/entrepreneur.guard';

export const routes: Routes = [
  // {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
  {path: 'login', component: ConnexionComponent},
  {path: 'register', component: InscriptionComponent},
  { path: 'dashboard', component: AdminComponent, canActivate: [AdministrationGuard] },
  {path: 'dashboard/admin', component: DashboardAdminComponent, canActivate: [AdministrationGuard]},
  {path: 'dashboard/super-admin', component: DashboardSuperAdminComponent, canActivate: [AdministrationGuard]},
  {path: 'dashboard/entrepreneur', component: DashboardEntrepreneurComponent, canActivate: [EntrepreneurGuard]},

  // {path: 'admin', component: AdministrationComponent, canActivate: [AdministrationGuard]},
  // {path: '**', component: PageNotFoundComponent}
];
