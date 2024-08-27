// src/app/components/Guides/guide-list/guide-list.component.ts
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Guide } from '../../../../models/guide.model';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { GuideService } from '../../../../Services/guide.service';
import { NavbarEntrepreneurComponent } from '../../../Entrepreneurs/layout/navbar-entrepreneur/navbar-entrepreneur.component';

@Component({
  selector: 'app-guide-list',
  templateUrl: './guide-list.component.html',
  styleUrls: ['./guide-list.component.css'],
  standalone: true,
  imports: [CommonModule,NavbarEntrepreneurComponent]
})
export class GuideListComponent implements OnInit {
  guides: Guide[] = [];
  @Output() guideSelected = new EventEmitter<number>();

  constructor(private guideService: GuideService) {}

  ngOnInit(): void {
    this.loadGuides();
  }

  private loadGuides(): void {
    this.guideService.getGuides().subscribe(
      (guides: Guide[]) => {
        this.guides = guides;
      },
      (error: HttpErrorResponse) => {
        console.error('Erreur lors du chargement des guides:', error.message);
      }
    );
  }

  selectGuide(guideId: number): void {
    this.guideSelected.emit(guideId);
  }
}
