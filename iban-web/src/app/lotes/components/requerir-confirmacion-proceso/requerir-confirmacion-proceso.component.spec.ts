import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequerirConfirmacionProcesoComponent } from './requerir-confirmacion-proceso.component';

describe('RequerirConfirmacionProcesoComponent', () => {
  let component: RequerirConfirmacionProcesoComponent;
  let fixture: ComponentFixture<RequerirConfirmacionProcesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequerirConfirmacionProcesoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequerirConfirmacionProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
