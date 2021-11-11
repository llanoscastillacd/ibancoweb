import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLoteComponent } from './view-lote.component';

describe('ViewLoteComponent', () => {
  let component: ViewLoteComponent;
  let fixture: ComponentFixture<ViewLoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
