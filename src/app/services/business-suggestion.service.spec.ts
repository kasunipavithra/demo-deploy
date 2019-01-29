import { TestBed } from '@angular/core/testing';

import { BusinessSuggestionService } from './business-suggestion.service';

describe('BusinessSuggestionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusinessSuggestionService = TestBed.get(BusinessSuggestionService);
    expect(service).toBeTruthy();
  });
});
