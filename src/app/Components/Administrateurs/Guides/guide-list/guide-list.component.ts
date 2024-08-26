import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Guide } from '../../../../models/guide.model';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { GuideService } from '../../../../Services/guide.service';

@Component({
  selector: 'app-guide-list',
  templateUrl: './guide-list.component.html',
  styleUrls: ['./guide-list.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class GuideListComponent implements OnInit {
  guidesByStep: { [step: string]: Guide[] } = {}; // Dictionnaire pour stocker les guides par étape
  @Output() guideSelected = new EventEmitter<number>();

  constructor(private guideService: GuideService) {}

  ngOnInit(): void {
    this.loadGuides();
  }

  private loadGuides(): void {
    this.guideService.getGuides().subscribe(
      (guides: Guide[]) => {
        this.groupGuidesByStep(guides);
      },
      (error: HttpErrorResponse) => {
        console.error('Erreur lors du chargement des guides:', error.message);
      }
    );
  }

  private groupGuidesByStep(guides: Guide[]): void {
    guides.forEach((guide) => {
      if (!this.guidesByStep[guide.etape]) {
        this.guidesByStep[guide.etape] = [];
      }
      this.guidesByStep[guide.etape].push(guide);
    });
  }

  selectGuide(guideId: number): void {
    this.guideSelected.emit(guideId);
  }
  getSteps(): string[] {
    return Object.keys(this.guidesByStep);
  }

}
