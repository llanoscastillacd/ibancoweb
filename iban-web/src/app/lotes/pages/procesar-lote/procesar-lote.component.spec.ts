import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesarLoteComponent } from './procesar-lote.component';

describe('ProcesarLoteComponent', () => {
  let component: ProcesarLoteComponent;
  let fixture: ComponentFixture<ProcesarLoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcesarLoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcesarLoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
