import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Movie } from './movie.interface';

@Injectable()
export class MoviesService {
  movies$: Subject<ReadonlyArray<Movie>>;

  constructor() {}
}
