import { Movie } from '../movie';
import { MhMovie } from './mh-movie';

export class MhMovieMapper {
  static toMovie(mhMovie: MhMovie): Movie {
    return {
      id: mhMovie.id,
      releaseDate: mhMovie['Release Date'],
      imdbVotes: mhMovie['IMDB Votes'],
      director: mhMovie.Director,
      majorGenre: mhMovie['Major Genre'],
      distributor: mhMovie.Distributor,
      imdbRating: mhMovie['IMDB Rating'],
      title: mhMovie.Title,
      usDvdSales: mhMovie['US DVD Sales'],
      usGross: mhMovie['US Gross'],
      productionBudget: mhMovie['Production Budget'],
      rottenTomatoesRating: mhMovie['Rotten Tomatoes Rating'],
      worldwideGross: mhMovie['Worldwide Gross'],
    };
  }
}
