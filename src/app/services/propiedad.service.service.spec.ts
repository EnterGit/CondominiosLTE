import { TestBed } from '@angular/core/testing';

import { PropiedadServiceService } from './propiedad.service.service';

describe('PropiedadServiceService', () => {
  let service: PropiedadServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropiedadServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
