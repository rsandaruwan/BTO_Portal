import { TestBed } from '@angular/core/testing';

import { tokestorageServiceService } from './token-storage.service.service';

describe('tokestorageServiceService', () => {
  let service: tokestorageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(tokestorageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
