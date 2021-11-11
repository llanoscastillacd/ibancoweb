import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequerirConfirmacionAnularSolicitudComponent } from './requerir-confirmacion-anular-solicitud.component';

describe('RequerirConfirmacionAnularSolicitudComponent', () => {
  let component: RequerirConfirmacionAnularSolicitudComponent;
  let fixture: ComponentFixture<RequerirConfirmacionAnularSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequerirConfirmacionAnularSolicitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequerirConfirmacionAnularSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
