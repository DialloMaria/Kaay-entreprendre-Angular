import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentaireGuidesListComponent } from './commentaire-guides-list.component';

describe('CommentaireGuidesListComponent', () => {
  let component: CommentaireGuidesListComponent;
  let fixture: ComponentFixture<CommentaireGuidesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentaireGuidesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentaireGuidesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
