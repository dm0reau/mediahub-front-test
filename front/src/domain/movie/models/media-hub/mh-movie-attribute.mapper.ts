import { MovieSortAttribute } from '../movie-sort-attribute';
import { MhMovieSortAttribute } from './mh-movie-sort-attribute';

export class MhMovieAttributeMapper {
  static fromMovieAttribute(
    movieSortAttribute: MovieSortAttribute
  ): MhMovieSortAttribute {
    const attributesMap: Record<MovieSortAttribute, MhMovieSortAttribute> = {
      id: 'id',
      title: 'Title',
      usGross: 'US Gross',
      usDvdSales: 'US DVD Sales',
      worldwideGross: 'Worldwide Gross',
      productionBudget: 'Production Budget',
      imdbRating: 'IMDB Rating',
      distributor: 'Distributor',
      majorGenre: 'Major Genre',
      director: 'Director',
      imdbVotes: 'IMDB Votes',
      releaseDate: 'Release Date',
      rottenTomatoesRating: 'Rotten Tomatoes Rating',
    };

    return attributesMap[movieSortAttribute];
  }
}
