import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  user: any;
  ngOnInit(): void {
      const userString = localStorage.getItem('user');
    this.user = userString? JSON.parse(userString) : { username: '', roles: [] };
    this.initializeSidebarToggle();

  }

  letmenuToggle: HTMLElement | null = document.getElementById('menu-toggle');
  sidebar: HTMLElement | null = document.getElementById('sidebar');
 initializeSidebarToggle() {
   const menuToggle: HTMLElement | null = document.getElementById('menu-toggle');
   const sidebar: HTMLElement | null = document.getElementById('sidebar');

   if (menuToggle && sidebar) {
       menuToggle.addEventListener('click', () => {
           sidebar.classList.toggle('-translate-x-full');
       });
   }
 }

}
