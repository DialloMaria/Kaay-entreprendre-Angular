import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEntrepreneurComponent } from './liste-entrepreneur.component';

describe('ListEntrepreneurComponent', () => {
  let component: ListEntrepreneurComponent;
  let fixture: ComponentFixture<ListEntrepreneurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListEntrepreneurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListEntrepreneurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
