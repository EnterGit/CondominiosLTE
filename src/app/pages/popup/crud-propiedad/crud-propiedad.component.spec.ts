import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudPropiedadComponent } from './crud-propiedad.component';

describe('CrudPropiedadComponent', () => {
  let component: CrudPropiedadComponent;
  let fixture: ComponentFixture<CrudPropiedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudPropiedadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudPropiedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
