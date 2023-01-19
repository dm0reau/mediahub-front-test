import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesRoutingModule } from './movies-routing.module';
import { ListComponent } from './list/list.component';
import { SearchComponent } from './list/search/search.component';
import { FormsModule } from '@angular/forms';
import { MoviesListStateService } from './list/movies-list-state.service';
import { SearchService } from './list/search/search.service';
import { DetailsComponent } from './details/details.component';
import { MovieDetailsService } from './details/movie-details.service';
import { SorterComponent } from './list/sorter/sorter.component';
import { HttpClient } from '@angular/common/http';
import { AngularMhHttpClient } from '../../infra/adapters/angular-mh-http-client';
import { HttpMovieGateway } from '../../domain/movie/adapters/http-movie.gateway';

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
      useFactory: (httpClient: HttpClient) => {
        const angularMhHttpClient = new AngularMhHttpClient(httpClient);
        return new HttpMovieGateway(angularMhHttpClient);
      },
      deps: [HttpClient],
    },
    MoviesListStateService,
    MovieDetailsService,
    SearchService,
  ],
  imports: [CommonModule, MoviesRoutingModule, FormsModule],
})
export class MoviesModule {}
