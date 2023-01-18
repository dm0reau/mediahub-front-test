import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MoviesListStateService } from '../movies-list-state.service';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit, OnDestroy {
  query = '';
  private querySub$?: Subscription;

  constructor(
    private readonly moviesListStateService: MoviesListStateService,
    private readonly searchService: SearchService
  ) {}

  ngOnInit() {
    this.querySub$ = this.moviesListStateService
      .getState()
      .subscribe((state) => (this.query = state.searchQuery ?? ''));
  }

  search() {
    this.searchService.search(this.query);
  }

  clear() {
    this.searchService.clear();
  }

  ngOnDestroy() {
    this.querySub$?.unsubscribe();
  }
}
