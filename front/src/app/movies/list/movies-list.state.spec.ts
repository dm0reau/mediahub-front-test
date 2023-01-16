import { TestBed } from '@angular/core/testing';

import { MoviesListState } from './movies-list-state.service';

describe('MoviesService', () => {
  let service: MoviesListState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoviesListState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
