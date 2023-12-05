import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudVisitasComponent } from './crud-visitas.component';

describe('CrudVisitasComponent', () => {
  let component: CrudVisitasComponent;
  let fixture: ComponentFixture<CrudVisitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudVisitasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudVisitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
