import { Component } from '@angular/core';
import { MoviesListState } from './movies-list.state';
import { Observable } from 'rxjs';
import { MoviesList } from '../../../domain/models/movies-list';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  movies$: Observable<MoviesList>;

  constructor(private readonly moviesListService: MoviesListState) {
    this.movies$ = this.moviesListService.listenTo();
  }
}
