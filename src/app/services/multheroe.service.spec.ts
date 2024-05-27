import { TestBed } from '@angular/core/testing';

import { MultheroeService } from './multheroe.service';

describe('MultheroeService', () => {
  let service: MultheroeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultheroeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
