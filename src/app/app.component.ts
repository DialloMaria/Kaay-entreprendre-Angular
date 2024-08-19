import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommentaireGuidesListComponent } from './Components/Entrepreneurs/Commentaire-guides/commentaire-guides-list/commentaire-guides-list.component';
import { EvenementComponent } from "./Components/Entrepreneurs/Evenement/evenement.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommentaireGuidesListComponent, EvenementComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Kaay-Entreprendre';
}
