import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoNequi } from './pago-nequi';

describe('PagoNequi', () => {
  let component: PagoNequi;
  let fixture: ComponentFixture<PagoNequi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagoNequi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagoNequi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
