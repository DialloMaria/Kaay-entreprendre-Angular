import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieEntrepreneurComponent } from './categorie-entrepreneur.component';

describe('CategorieEntrepreneurComponent', () => {
  let component: CategorieEntrepreneurComponent;
  let fixture: ComponentFixture<CategorieEntrepreneurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorieEntrepreneurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorieEntrepreneurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
