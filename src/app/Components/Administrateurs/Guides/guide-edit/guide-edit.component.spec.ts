import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideEditComponent } from './guide-edit.component';

describe('GuideEditComponent', () => {
  let component: GuideEditComponent;
  let fixture: ComponentFixture<GuideEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuideEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuideEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
