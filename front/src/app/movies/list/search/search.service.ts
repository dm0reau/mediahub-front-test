import { Inject, Injectable } from '@angular/core';
import { MoviesListState } from '../movies-list.state';
import { MoviesGateway } from '../../../../domain/ports/movies.gateway';

@Injectable()
export class SearchService {
  constructor(
    private readonly moviesListState: MoviesListState,
    @Inject('MoviesGateway')
    private readonly moviesGateway: MoviesGateway
  ) {}

  search(keywords: string) {
    if (keywords.length === 0) {
      this.moviesListState.next([]);
      return;
    }

    this.moviesGateway
      .searchMovies(keywords)
      .subscribe((movies) => this.moviesListState.next(movies));
  }
}
