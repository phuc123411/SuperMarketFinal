import { TestBed } from '@angular/core/testing';

import { GHNService } from './ghn.service';

describe('GHNService', () => {
  let service: GHNService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GHNService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
