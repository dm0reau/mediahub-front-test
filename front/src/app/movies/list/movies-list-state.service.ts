import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MoviesList } from '../../../domain/movie/models/movies-list';
import { MovieSortAttribute } from '../../../domain/movie/models/movie-sort-attribute';

export type MoviesListState = Partial<{
  moviesList: MoviesList;
  searchQuery: string;
  searchSortBy: MovieSortAttribute;
}>;

@Injectable()
export class MoviesListStateService {
  private readonly state$ = new BehaviorSubject<MoviesListState>({});

  getState(): Observable<MoviesListState> {
    return this.state$.asObservable();
  }

  setState(newState: MoviesListState): void {
    const currentState = this.state$.getValue();
    this.state$.next({ ...currentState, ...newState });
  }
}
