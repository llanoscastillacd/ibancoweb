import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequerirConfirmacionAnularLoteComponent } from './requerir-confirmacion-anular-lote.component';

describe('RequerirConfirmacionAnularLoteComponent', () => {
  let component: RequerirConfirmacionAnularLoteComponent;
  let fixture: ComponentFixture<RequerirConfirmacionAnularLoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequerirConfirmacionAnularLoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequerirConfirmacionAnularLoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
