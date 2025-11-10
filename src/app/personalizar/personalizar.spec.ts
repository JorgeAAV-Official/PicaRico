import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Personalizar } from './personalizar';

describe('Personalizar', () => {
  let component: Personalizar;
  let fixture: ComponentFixture<Personalizar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Personalizar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Personalizar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
