import { Injectable } from '@angular/core';
import { MoviesListService } from '../movies-list.service';

@Injectable()
export class SearchService {
  constructor(private readonly moviesListService: MoviesListService) {}

  search(keywords: string) {
    if (keywords.length === 0) {
      this.moviesListService.next([]);
      return;
    }

    this.moviesListService.next([
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
