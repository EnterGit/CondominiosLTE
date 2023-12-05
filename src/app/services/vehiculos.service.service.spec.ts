import { TestBed } from '@angular/core/testing';

import { VehiculosServiceService } from './vehiculos.service.service';

describe('VehiculosServiceService', () => {
  let service: VehiculosServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehiculosServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
