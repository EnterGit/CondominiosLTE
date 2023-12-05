import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortonesComponent } from './portones.component';

describe('PortonesComponent', () => {
  let component: PortonesComponent;
  let fixture: ComponentFixture<PortonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortonesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
