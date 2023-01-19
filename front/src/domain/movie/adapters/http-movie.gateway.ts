import { MovieGateway } from '../ports/movie.gateway';
import { Movie } from '../models/movie';
import { map, Observable } from 'rxjs';
import { MoviesList } from '../models/movies-list';
import { MovieSortAttribute } from '../models/movie-sort-attribute';
import { MhHttpClient } from '../../../infra/ports/mh-http-client';
import { MhMovieAttributeMapper } from '../models/media-hub/mh-movie-attribute.mapper';
import { MhMovie } from '../models/media-hub/mh-movie';
import { MhMovieMapper } from '../models/media-hub/mh-movie.mapper';
import { MhMoviesList } from '../models/media-hub/mh-movies-list';

export class HttpMovieGateway implements MovieGateway {
  constructor(private readonly mhHttpClient: MhHttpClient) {}
  findMovie(id: number): Observable<Movie> {
    const uri = `movies/${id}`;
    return this.mhHttpClient
      .get<MhMovie>(uri)
      .pipe(map((mhMovie) => MhMovieMapper.toMovie(mhMovie)));
  }

  searchAndSortMovies(
    query: string,
    sortBy: MovieSortAttribute
  ): Observable<MoviesList> {
    const sortQuery = MhMovieAttributeMapper.fromMovieAttribute(sortBy);
    const uri = `movies?query=${encodeURI(query)}&sortBy=${encodeURI(
      sortQuery
    )}`;
    return this.mhHttpClient
      .get<MhMoviesList>(uri)
      .pipe(map((mhMovies) => mhMovies.map(MhMovieMapper.toMovie)));
  }

  searchMovies(query: string): Observable<MoviesList> {
    const uri = `movies?query=${encodeURI(query)}`;
    return this.mhHttpClient
      .get<MhMoviesList>(uri)
      .pipe(map((mhMovies) => mhMovies.map(MhMovieMapper.toMovie)));
  }
}
