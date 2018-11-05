
import {Component, Input, OnInit} from '@angular/core';
import {TmdbService} from '../tmdb.service';
import {MovieResponse} from '../tmdb-data/Movie';
import { ActivatedRoute } from "@angular/router";
import {SearchMovieResponse} from '../tmdb-data/searchMovie';


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

@Component({
  selector: 'app-listmovie-con',
  templateUrl: './listmovie.cons.html',
})

export class ListmovieCons implements OnInit{
  data: MovieResponse;
  currentSearchResMovie: SearchMovieResponse;

  @Input() movieId: number;

  constructor(private tmdb: TmdbService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      if(params.type === "action"){
        

        console.log('test OK');
      }
      if(params.type === "tendances"){
        console.log('test OK');                                                  
        this.data = null;
        this.tmdb.getPopularMovie().then(res =>this.data = res);
      }
      if(params.type === "recents"){
        console.log('test OK');                                                  
        this.data = null;
        this.tmdb.getLatestMovie().then(res =>this.data = res);
      }
      else{
        this.currentSearchResMovie = null;
        this.tmdb.searchMovie({query: params.search}).then(
        res => this.currentSearchResMovie = res
        );
      }
      console.log(params);
    });
   }
   ngOnInit() {  }
}
