import { TestBed } from '@angular/core/testing';

import { AviaryService } from './aviary.service';

describe('AviaryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AviaryService = TestBed.get(AviaryService);
    expect(service).toBeTruthy();
  });
});
