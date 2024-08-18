import { TestBed } from '@angular/core/testing';

import { SousDomaineService } from './services/sous-domaine.service';

describe('SousDomaineService', () => {
  let service: SousDomaineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SousDomaineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
