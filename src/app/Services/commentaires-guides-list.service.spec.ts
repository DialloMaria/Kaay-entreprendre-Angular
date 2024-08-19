import { TestBed } from '@angular/core/testing';

import { CommentairesGuidesListService } from './commentaires-guides-list.service';

describe('CommentairesGuidesListService', () => {
  let service: CommentairesGuidesListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentairesGuidesListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
