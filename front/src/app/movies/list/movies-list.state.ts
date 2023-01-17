import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MoviesList } from '../../../domain/movie/models/movies-list';

@Injectable()
export class MoviesListState {
  private readonly movies$ = new BehaviorSubject<MoviesList>([]);

  observable() {
    return this.movies$.asObservable();
  }

  next(movies: MoviesList) {
    this.movies$.next(movies);
  }
}
