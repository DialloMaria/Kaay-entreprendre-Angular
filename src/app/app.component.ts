import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommentaireGuidesComponent } from "./Components/Entrepreneurs/Commentaire-guides/commentaire-guides-list/commentaire-guides-list.component";
import { ServiceComponent } from "./Components/Entrepreneurs/Service/service.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommentaireGuidesComponent, ServiceComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Kaay-Entreprendre';
}
