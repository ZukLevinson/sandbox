import { TestBed } from '@angular/core/testing';

import { DeckGlService } from './deck-gl.service';

describe('DeckGlService', () => {
  let service: DeckGlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeckGlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
