import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSolicitudComponent } from './view-solicitud.component';

describe('ViewSolicitudComponent', () => {
  let component: ViewSolicitudComponent;
  let fixture: ComponentFixture<ViewSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSolicitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
