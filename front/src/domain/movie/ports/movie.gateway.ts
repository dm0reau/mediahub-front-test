import { MoviesList } from '../models/movies-list';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';

export interface MovieGateway {
  searchMovies(keywords: string): Observable<MoviesList>;

  searchAndSortMovies(
    keywords: string,
    sortBy: keyof Movie
  ): Observable<MoviesList>;

  findMovie(id: number): Observable<Movie>;
}
