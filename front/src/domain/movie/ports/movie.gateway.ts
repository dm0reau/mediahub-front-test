import { MoviesList } from '../models/movies-list';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';
import { MovieSortAttribute } from '../models/movie-sort-attribute';

export interface MovieGateway {
  searchMovies(keywords: string): Observable<MoviesList>;

  searchAndSortMovies(
    keywords: string,
    sortBy: MovieSortAttribute
  ): Observable<MoviesList>;

  findMovie(id: number): Observable<Movie>;
}
