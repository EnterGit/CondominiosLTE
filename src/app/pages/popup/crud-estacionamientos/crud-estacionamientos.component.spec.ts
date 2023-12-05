import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudEstacionamientosComponent } from './crud-estacionamientos.component';

describe('CrudEstacionamientosComponent', () => {
  let component: CrudEstacionamientosComponent;
  let fixture: ComponentFixture<CrudEstacionamientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudEstacionamientosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudEstacionamientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
