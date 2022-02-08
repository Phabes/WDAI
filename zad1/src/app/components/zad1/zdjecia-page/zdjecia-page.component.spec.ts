import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZdjeciaPageComponent } from './zdjecia-page.component';

describe('ZdjeciaPageComponent', () => {
  let component: ZdjeciaPageComponent;
  let fixture: ComponentFixture<ZdjeciaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZdjeciaPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZdjeciaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
