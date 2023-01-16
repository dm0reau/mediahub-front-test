export interface Movie {
  id: number;
  title: string;
  usGross: number;
  usDvdSales: number;
  worldwideGross?: number;
  productionBudget?: number;
  releaseDate?: string;
  distributor?: string;
  imdbRating?: number;
  imdbVotes?: number;
  majorGenre?: string;
  director?: string;
  rottenTomatoesRating?: string;
}

export type MovieList = ReadonlyArray<Movie>;
