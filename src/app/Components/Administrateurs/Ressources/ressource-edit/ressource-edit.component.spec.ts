import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RessourceEditComponent } from './ressource-edit.component';

describe('RessourceEditComponent', () => {
  let component: RessourceEditComponent;
  let fixture: ComponentFixture<RessourceEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RessourceEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RessourceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
