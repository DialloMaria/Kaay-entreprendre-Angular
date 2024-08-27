import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarEntrepreneurComponent } from './navbar-entrepreneur.component';

describe('NavbarEntrepreneurComponent', () => {
  let component: NavbarEntrepreneurComponent;
  let fixture: ComponentFixture<NavbarEntrepreneurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarEntrepreneurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarEntrepreneurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
