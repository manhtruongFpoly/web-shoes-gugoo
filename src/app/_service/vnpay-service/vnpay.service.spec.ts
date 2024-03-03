/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VnpayService } from './vnpay.service';

describe('Service: Vnpay', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VnpayService]
    });
  });

  it('should ...', inject([VnpayService], (service: VnpayService) => {
    expect(service).toBeTruthy();
  }));
});
