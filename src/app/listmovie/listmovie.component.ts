
import {Component, Input, OnInit} from '@angular/core';
import {TmdbService} from '../tmdb.service';
import {MovieResponse} from '../tmdb-data/Movie';
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-listmovie',
  templateUrl: './listmovie.component.html',
  styleUrls: ['./listmovie.component.css'],
})
export class ListmovieComponent implements OnInit {
  @Input()
  movies: MovieResponse[];


  data: MovieResponse;

  @Input() movieId: number;

  constructor(private tmdb: TmdbService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      if(params.type === "action"){
        console.log('test OK');
      }
      console.log(params);
      //Action select option
    });
   }

  ngOnInit() {

    //this.tmdb.getMovie(this.movieId).then(data => this.data = data);
  }

  constructor(private tmdb: TmdbService) {}

  ngOnInit() {}
}
