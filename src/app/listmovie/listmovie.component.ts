import {Component, Input, OnInit} from '@angular/core';
import {TmdbService} from '../tmdb.service';
import {MovieResponse} from '../tmdb-data/Movie';

@Component({
  selector: 'app-movie',
  templateUrl: './listmovie.component.html',
  styleUrls: ['./listmovie.component.css']
})
export class ListmovieComponent implements OnInit {

  data: MovieResponse;

  @Input() movieId: number;

  constructor(private tmdb: TmdbService) { }

  ngOnInit() {
    this.tmdb.getMovie(this.movieId).then(data => this.data = data);
  }

}
