import { MoviesGateway } from './movies.gateway';
import { firstValueFrom, lastValueFrom, NotFoundError } from 'rxjs';
import { InMemoryMoviesGateway } from '../adapters/in-memory-movies.gateway';

let moviesGateway: MoviesGateway;

beforeEach(() => {
  moviesGateway = new InMemoryMoviesGateway();
});

describe('movies search', () => {
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

describe('movies query by id', () => {
  it("raises an error when the given ID doesn't exists", () => {
    expect(firstValueFrom(moviesGateway.findMovie(999))).rejects.toThrow(
      NotFoundError
    );
  });

  it('gives a movie when its founded', async () => {
    const movie = await firstValueFrom(moviesGateway.findMovie(1));

    expect(movie).toEqual({
      id: 1,
      title: 'Le Grand Bleu',
      imdbRating: 8,
      imdbVotes: 120,
      rottenTomatoesRating: '80%',
      usGross: 1000,
      usDvdSales: 100,
    });
  });
});
