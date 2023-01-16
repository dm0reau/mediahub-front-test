import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesRoutingModule } from './movies-routing.module';
import { ListComponent } from './list/list.component';
import { SearchComponent } from './list/search/search.component';
import { FormsModule } from '@angular/forms';
import { MoviesListService } from './list/movies-list.service';
import { SearchService } from './list/search/search.service';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [ListComponent, SearchComponent, DetailsComponent],
  providers: [MoviesListService, SearchService],
  imports: [CommonModule, MoviesRoutingModule, FormsModule],
})
export class MoviesModule {}
