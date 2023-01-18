import { Inject, Injectable } from '@angular/core';
import { MoviesListStateService } from '../movies-list-state.service';
import { MovieGateway } from '../../../../domain/movie/ports/movie.gateway';
import { firstValueFrom } from 'rxjs';
import { MovieSortAttribute } from '../../../../domain/movie/models/movie-sort-attribute';

@Injectable()
export class SearchService {
  constructor(
    private readonly moviesListStateService: MoviesListStateService,
    @Inject('MoviesGateway')
    private readonly moviesGateway: MovieGateway
  ) {}

  search(query: string) {
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
