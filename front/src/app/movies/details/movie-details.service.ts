import { Injectable } from '@angular/core';
import { Movie } from '../../../domain/models/movie';
import { Observable } from 'rxjs';

@Injectable()
export class MovieDetailsService {
  constructor() {}

  find(id: string): Observable<Movie> {}
}
