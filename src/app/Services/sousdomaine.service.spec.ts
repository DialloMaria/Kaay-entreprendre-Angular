import { TestBed } from '@angular/core/testing';

import { SousdomaineService } from './sousdomaine.service';

describe('SousdomaineService', () => {
  let service: SousdomaineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SousdomaineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
