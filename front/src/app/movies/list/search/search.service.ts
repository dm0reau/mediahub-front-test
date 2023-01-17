import { Inject, Injectable } from '@angular/core';
import { MoviesListState } from '../movies-list.state';
import { MovieGateway } from '../../../../domain/movie/ports/movie.gateway';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class SearchService {
  private readonly keywords$ = new BehaviorSubject('');

  constructor(
    private readonly moviesListState: MoviesListState,
    @Inject('MoviesGateway')
    private readonly moviesGateway: MovieGateway
  ) {
    console.log('search service constructor');
  }

  search(keywords: string) {
    console.log({ keywords });
    this.keywords$.next(keywords);

    if (keywords.length === 0) {
      this.moviesListState.next([]);
      return;
    }

    this.moviesGateway
      .searchMovies(keywords)
      .subscribe((movies) => this.moviesListState.next(movies));
  }

  keywords(): Observable<string> {
    return this.keywords$.asObservable();
  }
}
