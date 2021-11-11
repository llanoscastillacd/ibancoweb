import { TestBed } from '@angular/core/testing';

import { LotePagoService } from './lote-pago.service';

describe('LotePagoService', () => {
  let service: LotePagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LotePagoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
