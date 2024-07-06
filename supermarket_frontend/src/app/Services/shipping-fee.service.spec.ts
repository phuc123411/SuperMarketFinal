import { TestBed } from '@angular/core/testing';

import { ShippingFeeService } from './shipping-fee.service';

describe('ShippingFeeService', () => {
  let service: ShippingFeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShippingFeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
