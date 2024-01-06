import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrovisitasComponent } from './registrovisitas.component';

describe('RegistrovisitasComponent', () => {
  let component: RegistrovisitasComponent;
  let fixture: ComponentFixture<RegistrovisitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrovisitasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrovisitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
