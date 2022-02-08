import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Zad4Component } from './zad4.component';

describe('Zad4Component', () => {
  let component: Zad4Component;
  let fixture: ComponentFixture<Zad4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Zad4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Zad4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
