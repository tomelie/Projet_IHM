import { Component, Input, OnInit } from '@angular/core';
import { TmdbService } from '../tmdb.service';
import { MovieResponse } from '../tmdb-data/Movie';

@Component({
  selector: 'app-listmovie',
  templateUrl: './listmovie.component.html',
  styleUrls: ['./listmovie.component.css'],
})
export class ListmovieComponent implements OnInit {
  @Input()
  movies: MovieResponse[];

  constructor(private tmdb: TmdbService) {}

  ngOnInit() {}
}
