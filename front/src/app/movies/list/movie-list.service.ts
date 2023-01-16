import { Injectable } from '@angular/core';
import { Observer, Subject } from 'rxjs';
import { MovieList } from '../movie.interface';

@Injectable()
export class MovieListService {
  private readonly movies$ = new Subject<MovieList>();

  constructor() {
    this.movies$.next([]);
  }

  subscribeToMovieList(observer: Observer<MovieList>) {
    return this.movies$.subscribe(observer);
  }

  nextMovieList(movieList: MovieList) {
    this.movies$.next(movieList);
  }
}
