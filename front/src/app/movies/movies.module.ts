import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesRoutingModule } from './movies-routing.module';
import { ListComponent } from './list/list.component';
import { SearchComponent } from './list/search/search.component';
import { FormsModule } from '@angular/forms';
import { MoviesListState } from './list/movies-list-state.service';
import { SearchService } from './list/search/search.service';
import { DetailsComponent } from './details/details.component';
import { MovieDetailsService } from './details/movie-details.service';
import { InMemoryMoviesGateway } from '../../domain/adapters/in-memory-movies-gateway';

@NgModule({
  declarations: [ListComponent, SearchComponent, DetailsComponent],
  providers: [
    {
      provide: 'MoviesGateway',
      useClass: InMemoryMoviesGateway,
    },
    MoviesListState,
    MovieDetailsService,
    SearchService,
  ],
  imports: [CommonModule, MoviesRoutingModule, FormsModule],
})
export class MoviesModule {}
