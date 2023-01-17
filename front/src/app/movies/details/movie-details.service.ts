import { Inject, Injectable } from '@angular/core';
import { Movie } from '../../../domain/movie/models/movie';
import { Observable } from 'rxjs';
import { MovieGateway } from '../../../domain/movie/ports/movie.gateway';

@Injectable()
export class MovieDetailsService {
  constructor(
    @Inject('MoviesGateway') private readonly moviesGateway: MovieGateway
  ) {}

  find(id: number): Observable<Movie> {
    return this.moviesGateway.findMovie(id);
  }
}
