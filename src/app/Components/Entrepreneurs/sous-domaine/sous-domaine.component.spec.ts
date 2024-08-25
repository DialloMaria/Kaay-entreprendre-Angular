import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SousDomaineComponent } from './sous-domaine.component';

describe('SousDomaineComponent', () => {
  let component: SousDomaineComponent;
  let fixture: ComponentFixture<SousDomaineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SousDomaineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SousDomaineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
