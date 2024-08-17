import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEntrepreneurComponent } from './dashboard-entrepreneur.component';

describe('DashboardEntrepreneurComponent', () => {
  let component: DashboardEntrepreneurComponent;
  let fixture: ComponentFixture<DashboardEntrepreneurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardEntrepreneurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardEntrepreneurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
