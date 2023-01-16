import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesRoutingModule } from './movies-routing.module';
import { ListComponent } from './list/list.component';
import { SearchComponent } from './list/search/search.component';
import { FormsModule } from '@angular/forms';
import { MovieListService } from './list/movie-list.service';

@NgModule({
  declarations: [ListComponent, SearchComponent],
  providers: [MovieListService],
  imports: [CommonModule, MoviesRoutingModule, FormsModule],
})
export class MoviesModule {}
