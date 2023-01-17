import { Component, Input } from '@angular/core';
import { MovieSortAttribute } from '../../../../domain/movie/models/movie-sort-attribute';

@Component({
  selector: '[app-sorter]',
  templateUrl: './sorter.component.html',
})
export class SorterComponent {
  @Input()
  title!: string;
  @Input()
  sortBy!: MovieSortAttribute;
}
