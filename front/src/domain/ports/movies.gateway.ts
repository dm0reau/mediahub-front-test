import { MoviesList } from '../models/movies-list';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';

export interface MoviesGateway {
  searchMovies(): Observable<MoviesList>;

  findMovie(id: number): Observable<Movie | null>;
}
