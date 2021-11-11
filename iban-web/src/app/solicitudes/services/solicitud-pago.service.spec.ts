import { TestBed } from '@angular/core/testing';

import { SolicitudPagoService } from './solicitud-pago.service';

describe('SolicitudPagoService', () => {
  let service: SolicitudPagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudPagoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
