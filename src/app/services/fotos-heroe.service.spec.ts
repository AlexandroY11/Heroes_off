import { TestBed } from '@angular/core/testing';

import { FotosHeroeService } from './fotos-heroe.service';

describe('FotosHeroeService', () => {
  let service: FotosHeroeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FotosHeroeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
