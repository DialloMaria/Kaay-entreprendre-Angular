import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvenementsListComponent } from './evenement-list.component';

describe('EvenementsListComponent', () => {
  let component: EvenementsListComponent;
  let fixture: ComponentFixture<EvenementsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvenementsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvenementsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
