import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Inputc } from './inputc';

describe('Inputc', () => {
  let component: Inputc;
  let fixture: ComponentFixture<Inputc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Inputc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Inputc);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
