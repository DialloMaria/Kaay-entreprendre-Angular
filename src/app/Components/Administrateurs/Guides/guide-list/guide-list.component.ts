import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Guide } from '../../../../models/guide.model';  

@Component({
  selector: 'app-guide-list',
  standalone: true,
  imports: [CommonModule],  
  templateUrl: './guide-list.component.html',
  styleUrls: ['./guide-list.component.css']
})
export class GuideListComponent {
  public guides: Guide[] = [];

  ngOnInit(): void {
   
    this.guides = [
      {
        id: 1,
        titre: 'Guide: Algorithmes',
        contenu: 'Le lorem ipsum est, en imprimerin Le lorem ipsum est, ',
        datepublication: '2024-08-18',
        media: 'assets/images/imageGUIDE1.png',
        auteur: 'Auteur 1',
        domaine_id: 1,
        user_id: 101
      },
    
     
    ];
  }
}
