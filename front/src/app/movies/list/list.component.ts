import { Component } from '@angular/core';
import { MoviesListService } from './movies-list.service';
import { MoviesList } from '../movie.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  movies$: Observable<MoviesList>;

  constructor(private readonly moviesListService: MoviesListService) {
    this.movies$ = this.moviesListService.listenTo();
  }
}
