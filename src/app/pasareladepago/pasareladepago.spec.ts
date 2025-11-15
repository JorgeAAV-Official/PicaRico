import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pasareladepago } from './pasareladepago';

describe('Pasareladepago', () => {
  let component: Pasareladepago;
  let fixture: ComponentFixture<Pasareladepago>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pasareladepago]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pasareladepago);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
