import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MoviesList } from '../../../domain/models/movies-list';

@Injectable()
export class MoviesListState {
  private readonly movies$ = new Subject<MoviesList>();

  constructor() {
    this.movies$.next([]);
  }

  observable() {
    return this.movies$.asObservable();
  }

  next(movies: MoviesList) {
    this.movies$.next(movies);
  }
}
