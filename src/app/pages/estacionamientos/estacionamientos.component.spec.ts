import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstacionamientosComponent } from './estacionamientos.component';

describe('EstacionamientosComponent', () => {
  let component: EstacionamientosComponent;
  let fixture: ComponentFixture<EstacionamientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstacionamientosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstacionamientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
