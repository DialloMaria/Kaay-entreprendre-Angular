import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar-entrepreneur',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar-entrepreneur.component.html',
  styleUrl: './navbar-entrepreneur.component.css'
})
export class NavbarEntrepreneurComponent {
  user: any;
  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    this.user = userString? JSON.parse(userString) : { username: '', roles: [] };

  }
}
