import { MoviesGateway } from '../ports/movies.gateway';
import { Movie } from '../models/movie';
import { map, NotFoundError, Observable, of } from 'rxjs';
import { MoviesList } from '../models/movies-list';

export class InMemoryMoviesGateway implements MoviesGateway {
  findMovie(id: number): Observable<Movie> {
    return of(id - 1).pipe(
      map((dataIndex) => {
        if (!moviesData[dataIndex]) {
          throw new NotFoundError(`Movie with ID ${id} not found`);
        }
        return moviesData[dataIndex];
      })
    );
  }

  searchMovies(keywords: string): Observable<MoviesList> {
    return of(
      moviesData.filter((movie) =>
        movie.title.toLowerCase().includes(keywords.toLowerCase())
      )
    );
  }
}

const moviesData = [
  {
    id: 1,
    title: 'Le Grand Bleu',
    imdbRating: 8,
    imdbVotes: 120,
    rottenTomatoesRating: '80%',
    usGross: 1000,
    usDvdSales: 100,
  },
  {
    id: 2,
    title: 'La Grande Vadrouille',
    usGross: 0,
    imdbRating: 9,
    imdbVotes: 20,
    rottenTomatoesRating: '90%',
    usDvdSales: 0,
  },
];
