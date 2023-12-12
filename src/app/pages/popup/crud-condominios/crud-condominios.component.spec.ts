import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudCondominiosComponent } from './crud-condominios.component';

describe('CrudCondominiosComponent', () => {
  let component: CrudCondominiosComponent;
  let fixture: ComponentFixture<CrudCondominiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudCondominiosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudCondominiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
