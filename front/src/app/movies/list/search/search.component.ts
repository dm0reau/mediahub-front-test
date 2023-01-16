import { Component } from '@angular/core';
import { SearchService } from './search.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  keywords = '';

  constructor(private readonly searchService: SearchService) {}

  search() {
    this.searchService.search(this.keywords);
  }
}
