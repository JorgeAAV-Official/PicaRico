import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bandejas } from './bandejas';

describe('Bandejas', () => {
  let component: Bandejas;
  let fixture: ComponentFixture<Bandejas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bandejas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bandejas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
