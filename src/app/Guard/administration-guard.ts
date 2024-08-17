import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { Role } from '../Models/roles.model';



interface User {
  roles: Role[];
  // Ajoutez d'autres propriétés si nécessaire
}

export const AdministrationGuard: CanActivateFn = () => {
  const router = inject(Router);
  let user: User = { roles: [] };

  try {
    const userString = localStorage.getItem('user');
    user = userString ? JSON.parse(userString) : { roles: [] };
  } catch (error) {
    console.error('Erreur lors du parsing du JSON:', error);
    user = { roles: [] }; // En cas d'erreur, assumez que l'utilisateur n'est pas valide
  }

  console.log('User Data:', user);
  console.log('User Roles:', user.roles);

  // Vérifiez si l'utilisateur a le rôle 'admin' ou 'super_admin'
  if (user && user.roles && user.roles.some((role: Role) => role.name === 'admin' || role.name === 'super_admin')) {
    console.log('Utilisateur connecté avec les rôles administrateur.');
    return true;
  } else {
    router.navigateByUrl('login');
    console.log('Utilisateur non connecté ou pas administrateur.');
    return false;
  }
};
