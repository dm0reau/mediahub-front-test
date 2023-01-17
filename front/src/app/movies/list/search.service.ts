import { Inject, Injectable } from '@angular/core';
import { MoviesListState } from './movies-list.state';
import { MovieGateway } from '../../../domain/movie/ports/movie.gateway';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
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

  async sort(sortBy: MovieSortAttribute) {
    const keywords = await firstValueFrom(this.keywords$);
    const moviesList = await firstValueFrom(
      this.moviesGateway.searchAndSortMovies(keywords, sortBy)
    );
    this.moviesListState.next(moviesList);
  }

  keywords(): Observable<string> {
    return this.keywords$.asObservable();
  }

  clear() {
    this.keywords$.next('');
    this.moviesListState.next([]);
  }
}
