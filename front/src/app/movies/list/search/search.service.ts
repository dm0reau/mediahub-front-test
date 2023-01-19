import { Inject, Injectable } from '@angular/core';
import { MoviesListStateService } from '../movies-list-state.service';
import { MovieGateway } from '../../../../domain/movie/ports/movie.gateway';
import { firstValueFrom, sampleTime, Subject } from 'rxjs';
import { MovieSortAttribute } from '../../../../domain/movie/models/movie-sort-attribute';

const THROTTLE_TIME_IN_SECONDS = 1000;

@Injectable()
export class SearchService {
  private searchQueries$ = new Subject<string>();

  constructor(
    private readonly moviesListStateService: MoviesListStateService,
    @Inject('MoviesGateway')
    private readonly moviesGateway: MovieGateway
  ) {
    this.searchQueries$
      .pipe(sampleTime(THROTTLE_TIME_IN_SECONDS))
      .subscribe((query) => {
        this.moviesListStateService.setState({ searchQuery: query });

        if (query.length === 0) {
          this.moviesListStateService.setState({ moviesList: [] });
          return;
        }

        this.moviesGateway
          .searchMovies(query)
          .subscribe((movies) =>
            this.moviesListStateService.setState({ moviesList: movies })
          );
      });
  }

  search(query: string) {
    this.searchQueries$.next(query);
  }

  async sort(sortBy: MovieSortAttribute) {
    const currentState = await firstValueFrom(
      this.moviesListStateService.getState()
    );
    const moviesList = await firstValueFrom(
      this.moviesGateway.searchAndSortMovies(currentState.searchQuery!, sortBy)
    );
    this.moviesListStateService.setState({ moviesList, searchSortBy: sortBy });
  }

  clear() {
    this.moviesListStateService.setState({
      searchQuery: '',
      moviesList: [],
    });
  }
}
