import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesRoutingModule } from './movies-routing.module';
import { ListComponent } from './list/list.component';
import { SearchComponent } from './list/search/search.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ListComponent, SearchComponent],
  imports: [CommonModule, MoviesRoutingModule, FormsModule],
})
export class MoviesModule {}
