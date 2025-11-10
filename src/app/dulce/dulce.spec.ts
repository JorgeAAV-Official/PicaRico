import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dulce } from './dulce';

describe('Dulce', () => {
  let component: Dulce;
  let fixture: ComponentFixture<Dulce>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dulce]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dulce);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
