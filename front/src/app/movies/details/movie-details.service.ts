import { Inject, Injectable } from '@angular/core';
import { Movie } from '../../../domain/models/movie';
import { Observable } from 'rxjs';
import { MoviesGateway } from '../../../domain/ports/movies.gateway';

@Injectable()
export class MovieDetailsService {
  constructor(
    @Inject('MoviesGateway') private readonly moviesGateway: MoviesGateway
  ) {}

  find(id: number): Observable<Movie> {
    return this.moviesGateway.findMovie(id);
  }
}
