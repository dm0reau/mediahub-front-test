import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MovieSortAttribute } from '../../../../domain/movie/models/movie-sort-attribute';
import { SearchService } from '../search/search.service';
import { MoviesListStateService } from '../movies-list-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: '[app-sorter]',
  templateUrl: './sorter.component.html',
  styleUrls: ['./sorter.component.scss'],
})
export class SorterComponent implements OnInit, OnDestroy {
  @Input()
  title!: string;
  @Input()
  sortBy!: MovieSortAttribute;

  isActive = false;
  private moviesListStateSub$?: Subscription;

  constructor(
    private readonly searchService: SearchService,
    private readonly moviesListStateService: MoviesListStateService
  ) {}

  ngOnInit(): void {
    this.moviesListStateSub$ = this.moviesListStateService
      .getState()
      .subscribe((state) => {
        this.isActive = state.searchSortBy === this.sortBy;
      });
  }

  async sort(): Promise<void> {
    await this.searchService.sort(this.sortBy);
  }

  ngOnDestroy(): void {
    this.moviesListStateSub$?.unsubscribe();
  }
}
