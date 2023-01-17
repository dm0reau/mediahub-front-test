import { Component, OnDestroy, OnInit } from '@angular/core';
import { MoviesListState } from './movies-list.state';
import { MoviesList } from '../../../domain/movie/models/movies-list';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  movies: MoviesList = [];
  private moviesSub$?: Subscription;

  constructor(private readonly moviesListService: MoviesListState) {}

  ngOnInit(): void {
    this.moviesSub$ = this.moviesListService
      .observable()
      .subscribe((movies) => (this.movies = movies));
  }

  ngOnDestroy() {
    this.moviesSub$?.unsubscribe();
  }
}
