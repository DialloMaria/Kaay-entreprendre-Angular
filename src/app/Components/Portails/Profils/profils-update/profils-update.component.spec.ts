import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilsUpdateComponent } from './profils-update.component';

describe('ProfilsUpdateComponent', () => {
  let component: ProfilsUpdateComponent;
  let fixture: ComponentFixture<ProfilsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilsUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
