import { Component } from '@angular/core';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent {
  keywords = '';

  constructor(private readonly searchService: SearchService) {}

  search() {
    this.searchService.search(this.keywords);
  }
}
