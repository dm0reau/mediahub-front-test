import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';
import { MovieDetailsService } from './movie-details.service';
import { Movie } from '../../../domain/models/movie';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  isLoading = true;
  movie: Movie | undefined;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly movieDetailsService: MovieDetailsService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        map((paramMap) => paramMap.get('id')),
        filter((routeId) => routeId !== null),
        map((routeId) => parseInt(routeId as string)),
        mergeMap((movieId) => this.movieDetailsService.find(movieId))
      )
      .subscribe((movie) => {
        this.movie = movie;
        this.isLoading = false;
      });
  }
}
