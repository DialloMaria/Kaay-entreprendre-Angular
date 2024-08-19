import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuideService } from '../../../../Services/guide.service';
import { GuideModel } from '../../../../Models/guides.model';

@Component({
  selector: 'app-guide-list',
  standalone: true,
  imports: [CommonModule], // Add necessary Angular modules here
  templateUrl: './guide-list.component.html',
  styleUrls: ['./guide-list.component.css'] // Corrected styleUrls
})
export class GuideListComponent implements OnInit {

  guides: GuideModel[] = []; // Use the correct type

  constructor(private guideService: GuideService) {}

  ngOnInit(): void {
    this.getGuides();
  }

  getGuides(): void {
    this.guideService.getGuides().subscribe((response: any) => {
      this.guides = response.data || response; // Adjust according to your API response structure
      console.log(this.guides);
    }, error => {
      console.error('Failed to fetch guides:', error);
    });
  }
}
