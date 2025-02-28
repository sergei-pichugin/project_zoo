import { TestBed } from '@angular/core/testing';

import { AviaryService } from './aviary.service';

describe('AviaryService', () => {
  let service: AviaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AviaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
