import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarProgresoComponent } from './mostrar-progreso.component';

describe('MostrarProgresoComponent', () => {
  let component: MostrarProgresoComponent;
  let fixture: ComponentFixture<MostrarProgresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarProgresoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarProgresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
