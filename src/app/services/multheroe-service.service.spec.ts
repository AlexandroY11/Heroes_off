import { TestBed } from '@angular/core/testing';

import { MultheroeServiceService } from './multheroe-service.service';

describe('MultheroeServiceService', () => {
  let service: MultheroeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultheroeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
