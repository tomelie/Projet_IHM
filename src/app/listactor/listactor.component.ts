import {Component, Input, OnInit} from '@angular/core';
import {MovieResponse} from '../tmdb-data/Movie';
import {TmdbService} from '../tmdb.service';

@Component({
  selector: 'app-listactor',
  templateUrl: './listactor.component.html',
  styleUrls: ['./listactor.component.css']
})
export class ListactorComponent implements OnInit {

  data: MovieResponse;

  @Input() movieId: number;

  constructor(private tmdb: TmdbService) { }

  ngOnInit() {
    this.tmdb.getMovie(this.movieId).then(data => this.data = data);
  }

}
