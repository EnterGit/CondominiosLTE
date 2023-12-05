import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudPortonesComponent } from './crud-portones.component';

describe('CrudPortonesComponent', () => {
  let component: CrudPortonesComponent;
  let fixture: ComponentFixture<CrudPortonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudPortonesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudPortonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
