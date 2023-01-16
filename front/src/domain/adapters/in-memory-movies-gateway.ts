import { MoviesGateway } from '../ports/movies.gateway';
import { Movie } from '../models/movie';
import { Observable, of } from 'rxjs';
import { MoviesList } from '../models/movies-list';

export class InMemoryMoviesGateway implements MoviesGateway {
  findMovie(id: number): Observable<Movie | null> {
    switch (id) {
      case 1:
        return of({
          id: 1,
          title: 'Le Grand Bleu',
          imdbRating: 8,
          imdbVotes: 120,
          rottenTomatoesRating: '80%',
          usGross: 1000,
          usDvdSales: 100,
        });
      case 2:
        return of({
          id: 2,
          title: 'La Grande Vadrouille',
          usGross: 0,
          imdbRating: 9,
          imdbVotes: 20,
          rottenTomatoesRating: '90%',
          usDvdSales: 0,
        });
      default:
        return of(null);
    }
  }

  searchMovies(): Observable<MoviesList> {
    return of([
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
    ]);
  }
}
