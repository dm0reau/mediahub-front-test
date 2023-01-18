import { Component, OnDestroy, OnInit } from '@angular/core';
import { MoviesListStateService } from './movies-list-state.service';
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

  constructor(
    private readonly moviesListStateService: MoviesListStateService
  ) {}

  ngOnInit(): void {
    this.moviesSub$ = this.moviesListStateService
      .getState()
      .subscribe((state) => (this.movies = state.moviesList ?? []));
  }

  ngOnDestroy() {
    this.moviesSub$?.unsubscribe();
  }
}
