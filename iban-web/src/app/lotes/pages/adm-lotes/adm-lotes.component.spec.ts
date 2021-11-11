import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmLotesComponent } from './adm-lotes.component';

describe('AdmLotesComponent', () => {
  let component: AdmLotesComponent;
  let fixture: ComponentFixture<AdmLotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmLotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmLotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
