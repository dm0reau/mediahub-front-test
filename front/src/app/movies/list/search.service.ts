import { Inject, Injectable } from '@angular/core';
import { MoviesListState } from './movies-list.state';
import { MovieGateway } from '../../../domain/movie/ports/movie.gateway';
import { BehaviorSubject, Observable } from 'rxjs';
import { MovieSortAttribute } from '../../../domain/movie/models/movie-sort-attribute';

@Injectable()
export class SearchService {
  private readonly keywords$ = new BehaviorSubject('');

  constructor(
    private readonly moviesListState: MoviesListState,
    @Inject('MoviesGateway')
    private readonly moviesGateway: MovieGateway
  ) {}

  search(keywords: string) {
    this.keywords$.next(keywords);

    if (keywords.length === 0) {
      this.moviesListState.next([]);
      return;
    }

    this.moviesGateway
      .searchMovies(keywords)
      .subscribe((movies) => this.moviesListState.next(movies));
  }

  searchAndSort(keywords: string, sortBy: MovieSortAttribute) {
    this.keywords$.next(keywords);

    if (keywords.length === 0) {
      this.moviesListState.next([]);
      return;
    }

    this.moviesGateway
      .searchAndSortMovies(keywords, sortBy)
      .subscribe((movies) => this.moviesListState.next(movies));
  }

  keywords(): Observable<string> {
    return this.keywords$.asObservable();
  }

  clear() {
    this.keywords$.next('');
    this.moviesListState.next([]);
  }
}
