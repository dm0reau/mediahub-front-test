import { MovieGateway } from '../ports/movie.gateway';
import { Movie } from '../models/movie';
import { map, Observable } from 'rxjs';
import { MoviesList } from '../models/movies-list';
import { MovieSortAttribute } from '../models/movie-sort-attribute';
import { MhHttpClient } from '../../../infra/ports/mh-http-client';
import { MhMovieAttributeConverter } from '../models/media-hub/mh-movie-attribute.converter';
import { MhMovie } from '../models/media-hub/mh-movie';
import { MhMovieConverter } from '../models/media-hub/mh-movie.converter';
import { MhMoviesList } from '../models/media-hub/mh-movies-list';

export class HttpMovieGateway implements MovieGateway {
  constructor(private readonly mhHttpClient: MhHttpClient) {}
  findMovie(id: number): Observable<Movie> {
    const uri = `movies/${id}`;
    return this.mhHttpClient
      .get<MhMovie>(uri)
      .pipe(map((mhMovie) => MhMovieConverter.toMovie(mhMovie)));
  }

  searchAndSortMovies(
    query: string,
    sortBy: MovieSortAttribute
  ): Observable<MoviesList> {
    const sortQuery = MhMovieAttributeConverter.fromMovieAttribute(sortBy);
    const uri = `movies?query=${encodeURI(query)}&sortBy=${encodeURI(
      sortQuery
    )}`;
    return this.mhHttpClient
      .get<MhMoviesList>(uri)
      .pipe(map((mhMovies) => mhMovies.map(MhMovieConverter.toMovie)));
  }

  searchMovies(query: string): Observable<MoviesList> {
    const uri = `movies?query=${encodeURI(query)}`;
    return this.mhHttpClient
      .get<MhMoviesList>(uri)
      .pipe(map((mhMovies) => mhMovies.map(MhMovieConverter.toMovie)));
  }
}
