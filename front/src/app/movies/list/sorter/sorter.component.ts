import { Component, Input } from '@angular/core';
import { MovieSortAttribute } from '../../../../domain/movie/models/movie-sort-attribute';
import { SearchService } from '../search.service';

@Component({
  selector: '[app-sorter]',
  templateUrl: './sorter.component.html',
  styleUrls: ['./sorter.component.scss'],
})
export class SorterComponent {
  @Input()
  title!: string;
  @Input()
  sortBy!: MovieSortAttribute;

  constructor(private readonly searchService: SearchService) {}

  async sort() {
    await this.searchService.sort(this.sortBy);
  }
}
