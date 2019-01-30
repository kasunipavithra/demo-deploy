import { TestBed } from '@angular/core/testing';

import { GetPointsService } from './get-points.service';

describe('GetPointsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetPointsService = TestBed.get(GetPointsService);
    expect(service).toBeTruthy();
  });
});
