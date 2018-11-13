import { TestBed, inject } from '@angular/core/testing';

import { TechcrunchService } from './techcrunch.service';

describe('TechcrunchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TechcrunchService]
    });
  });

  it('should be created', inject([TechcrunchService], (service: TechcrunchService) => {
    expect(service).toBeTruthy();
  }));
});
