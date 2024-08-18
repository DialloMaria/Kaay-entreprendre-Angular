import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDomaineListComponent } from './form-domaine-list.component';

describe('FormDomaineListComponent', () => {
  let component: FormDomaineListComponent;
  let fixture: ComponentFixture<FormDomaineListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormDomaineListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDomaineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
