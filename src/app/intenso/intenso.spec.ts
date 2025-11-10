import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Intenso } from './intenso';

describe('Intenso', () => {
  let component: Intenso;
  let fixture: ComponentFixture<Intenso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Intenso]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Intenso);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
