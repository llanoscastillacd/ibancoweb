import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveLoteComponent } from './save-lote.component';

describe('SaveLoteComponent', () => {
  let component: SaveLoteComponent;
  let fixture: ComponentFixture<SaveLoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveLoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveLoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
