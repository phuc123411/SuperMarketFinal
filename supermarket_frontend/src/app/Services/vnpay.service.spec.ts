import { TestBed } from '@angular/core/testing';

import { VNPayService } from './vnpay.service';

describe('VNPayService', () => {
  let service: VNPayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VNPayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
