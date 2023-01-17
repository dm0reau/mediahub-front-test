import { MovieGateway } from './movie.gateway';
import { firstValueFrom, lastValueFrom, NotFoundError } from 'rxjs';
import { InMemoryMovieGateway } from '../adapters/in-memory-movie.gateway';

let moviesGateway: MovieGateway;

beforeEach(() => {
  moviesGateway = new InMemoryMovieGateway();
});

describe('movie search', () => {
  it("doesn't find anything when keywords aren't in movie titles", async () => {
    const movies = await lastValueFrom(moviesGateway.searchMovies('rouge'));

    expect(movies).toEqual([]);
  });

  it('finds one movie by its title', async () => {
    const movies = await lastValueFrom(moviesGateway.searchMovies('bleu'));

    expect(movies).toEqual([
      expect.objectContaining({
        id: 1,
        title: 'Le Grand Bleu',
      }),
    ]);
  });

  it('finds many movie by their titles', async () => {
    const movies = await lastValueFrom(moviesGateway.searchMovies('le'));

    expect(movies).toEqual([
      expect.objectContaining({
        id: 1,
        title: 'Le Grand Bleu',
      }),
      expect.objectContaining({
        id: 2,
        title: 'La Grande Vadrouille',
      }),
    ]);
  });
});

describe('movie search and sort', () => {
  it("doesn't find anything when keywords aren't in movie titles", async () => {
    const movies = await lastValueFrom(
      moviesGateway.searchAndSortMovies('rouge', 'title')
    );

    expect(movies).toEqual([]);
  });

  it('finds one movie by its title', async () => {
    const movies = await lastValueFrom(
      moviesGateway.searchAndSortMovies('bleu', 'title')
    );

    expect(movies).toEqual([
      expect.objectContaining({
        id: 1,
        title: 'Le Grand Bleu',
      }),
    ]);
  });

  it('finds many movie by and ordered by their titles', async () => {
    const movies = await lastValueFrom(
      moviesGateway.searchAndSortMovies('grand', 'title')
    );

    expect(movies).toEqual([
      expect.objectContaining({
        id: 2,
        title: 'La Grande Vadrouille',
      }),
      expect.objectContaining({
        id: 1,
        title: 'Le Grand Bleu',
      }),
    ]);
  });
});

describe('movie query by id', () => {
  it("raises an error when the given ID doesn't exists", () => {
    expect(firstValueFrom(moviesGateway.findMovie(999))).rejects.toThrow(
      NotFoundError
    );
  });

  it('gives a movie when its founded', async () => {
    const movie = await firstValueFrom(moviesGateway.findMovie(1));

    expect(movie).toEqual(
      expect.objectContaining({
        id: 1,
        title: 'Le Grand Bleu',
      })
    );
  });
});
