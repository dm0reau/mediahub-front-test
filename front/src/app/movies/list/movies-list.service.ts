import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MoviesList } from '../movie.interface';

@Injectable()
export class MoviesListService {
  private readonly movies$ = new Subject<MoviesList>();

  constructor() {
    this.movies$.next([]);
  }

  listenTo() {
    return this.movies$.asObservable();
  }

  next(movies: MoviesList) {
    this.movies$.next(movies);
  }
}
