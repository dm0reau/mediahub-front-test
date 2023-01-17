import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchService } from './search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit, OnDestroy {
  keywords = '';
  private keywordsSub$?: Subscription;

  constructor(private readonly searchService: SearchService) {}

  ngOnInit() {
    this.keywordsSub$ = this.searchService
      .keywords()
      .subscribe((keywords) => (this.keywords = keywords));
  }

  search() {
    this.searchService.search(this.keywords);
  }

  ngOnDestroy() {
    this.keywordsSub$?.unsubscribe();
  }
}
