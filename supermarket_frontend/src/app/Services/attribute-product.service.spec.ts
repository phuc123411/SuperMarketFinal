import { TestBed } from '@angular/core/testing';

import { AttributeProductService } from './attribute-product.service';

describe('AttributeProductService', () => {
  let service: AttributeProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttributeProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
