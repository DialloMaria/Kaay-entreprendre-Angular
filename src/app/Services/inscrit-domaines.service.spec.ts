import { TestBed } from '@angular/core/testing';

import { InscritDomainesService } from './inscrit-domaines.service';

describe('InscritDomainesService', () => {
  let service: InscritDomainesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InscritDomainesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
