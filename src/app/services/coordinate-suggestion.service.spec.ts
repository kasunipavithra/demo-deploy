import { TestBed } from '@angular/core/testing';

import { CoordinateSuggestionService } from './coordinate-suggestion.service';

describe('CoordinateSuggestionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoordinateSuggestionService = TestBed.get(CoordinateSuggestionService);
    expect(service).toBeTruthy();
  });
});
