import { MoviesGateway } from './movies.gateway';
import { lastValueFrom } from 'rxjs';
import { InMemoryMoviesGateway } from '../adapters/in-memory-movies.gateway';

let moviesGateway: MoviesGateway;

beforeEach(() => {
  moviesGateway = new InMemoryMoviesGateway();
});

describe('the movies search', () => {
  it("doesn't find anything when keywords aren't in movies titles", async () => {
    const movies = await lastValueFrom(moviesGateway.searchMovies('rouge'));

    expect(movies).toEqual([]);
  });

  it('finds one movie by its title', async () => {
    const movies = await lastValueFrom(moviesGateway.searchMovies('bleu'));

    expect(movies).toEqual([
      {
        id: 1,
        title: 'Le Grand Bleu',
        imdbRating: 8,
        imdbVotes: 120,
        rottenTomatoesRating: '80%',
        usGross: 1000,
        usDvdSales: 100,
      },
    ]);
  });

  it('finds many movies by their titles', async () => {
    const movies = await lastValueFrom(moviesGateway.searchMovies('le'));

    expect(movies).toEqual([
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
  });
});
