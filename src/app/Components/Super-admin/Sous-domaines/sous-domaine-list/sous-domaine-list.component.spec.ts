import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SousDomaineListComponent } from './sous-domaine-list.component';

describe('SousDomaineListComponent', () => {
  let component: SousDomaineListComponent;
  let fixture: ComponentFixture<SousDomaineListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SousDomaineListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SousDomaineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
