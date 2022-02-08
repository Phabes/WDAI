import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Zad3Component } from './zad3.component';

describe('Zad3Component', () => {
  let component: Zad3Component;
  let fixture: ComponentFixture<Zad3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Zad3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Zad3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
