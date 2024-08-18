import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSousDomaineListComponent } from './form-sous-domaine-list.component';

describe('FormSousDomaineListComponent', () => {
  let component: FormSousDomaineListComponent;
  let fixture: ComponentFixture<FormSousDomaineListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSousDomaineListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSousDomaineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
