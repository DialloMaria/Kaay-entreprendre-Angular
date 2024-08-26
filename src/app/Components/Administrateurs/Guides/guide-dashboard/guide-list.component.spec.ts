import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideListDashComponent } from './guide-list.component';

describe('GuideListDashComponent', () => {
  let component: GuideListDashComponent;
  let fixture: ComponentFixture<GuideListDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuideListDashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuideListDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
