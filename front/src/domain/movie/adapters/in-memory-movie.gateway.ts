import { MovieGateway } from '../ports/movie.gateway';
import { Movie } from '../models/movie';
import { map, NotFoundError, Observable, of } from 'rxjs';
import { MoviesList } from '../models/movies-list';

export class InMemoryMovieGateway implements MovieGateway {
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

  searchAndSortMovies(
    keywords: string,
    sortBy: keyof Movie
  ): Observable<MoviesList> {
    return this.searchMovies(keywords).pipe(
      map((movies) =>
        movies.sort((firstMovie, secondMovie) => {
          const firstMovieAttribute = firstMovie[sortBy];
          const secondMovieAttribute = secondMovie[sortBy];

          if (!firstMovieAttribute || !secondMovieAttribute) {
            return 1;
          }

          return firstMovieAttribute < secondMovieAttribute ? -1 : 1;
        })
      )
    );
  }
}

const moviesData: MoviesList = [
  {
    id: 1,
    title: 'Le Grand Bleu',
    imdbRating: 8,
    imdbVotes: 120,
    rottenTomatoesRating: '80%',
    usGross: 1000,
    usDvdSales: 100,
    productionBudget: 500,
    worldwideGross: 2000,
    director: 'Luc Besson',
    releaseDate: '1988/05/11',
    majorGenre: 'Drame',
    distributor: 'Sony Pictures',
  },
  {
    id: 2,
    title: 'La Grande Vadrouille',
    usGross: 0,
    imdbRating: 9,
    imdbVotes: 20,
    worldwideGross: 200,
    productionBudget: 200,
    rottenTomatoesRating: '90%',
    usDvdSales: 0,
    distributor: 'Studio Canal',
    director: 'Gérard Oury',
    releaseDate: '1966/12/8',
    majorGenre: 'Comédie',
  },
];
