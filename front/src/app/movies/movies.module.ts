import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesRoutingModule } from './movies-routing.module';
import { ListComponent } from './list/list.component';
import { SearchComponent } from './list/search/search.component';
import { FormsModule } from '@angular/forms';
import { MoviesListState } from './list/movies-list.state';
import { SearchService } from './list/search.service';
import { DetailsComponent } from './details/details.component';
import { MovieDetailsService } from './details/movie-details.service';
import { InMemoryMovieGateway } from '../../domain/movie/adapters/in-memory-movie.gateway';
import { SorterComponent } from './list/sorter/sorter.component';

@NgModule({
  declarations: [
    ListComponent,
    SearchComponent,
    DetailsComponent,
    SorterComponent,
  ],
  providers: [
    {
      provide: 'MoviesGateway',
      useClass: InMemoryMovieGateway,
    },
    MoviesListState,
    MovieDetailsService,
    SearchService,
  ],
  imports: [CommonModule, MoviesRoutingModule, FormsModule],
})
export class MoviesModule {}
