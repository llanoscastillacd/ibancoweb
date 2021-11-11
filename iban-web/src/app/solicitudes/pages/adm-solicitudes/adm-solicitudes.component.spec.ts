import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmSolicitudesComponent } from './adm-solicitudes.component';

describe('AdmSolicitudesComponent', () => {
  let component: AdmSolicitudesComponent;
  let fixture: ComponentFixture<AdmSolicitudesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmSolicitudesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmSolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
