import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscritDomaineComponent } from './inscrit-domaine.component';

describe('InscritDomaineComponent', () => {
  let component: InscritDomaineComponent;
  let fixture: ComponentFixture<InscritDomaineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscritDomaineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscritDomaineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
