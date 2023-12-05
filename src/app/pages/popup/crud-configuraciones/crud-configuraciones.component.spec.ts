import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudConfiguracionesComponent } from './crud-configuraciones.component';

describe('CrudConfiguracionesComponent', () => {
  let component: CrudConfiguracionesComponent;
  let fixture: ComponentFixture<CrudConfiguracionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudConfiguracionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudConfiguracionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
