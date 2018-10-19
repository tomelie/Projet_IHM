import { Component, OnInit } from '@angular/core';
import {SearchMovieResponse} from '../tmdb-data/searchMovie';
import {TmdbService} from '../tmdb.service';
import {SearchPeopleResponse} from '../tmdb-data/SearchPeople';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  currentSearchResMovie: SearchMovieResponse;
  currentSearchResActor: SearchPeopleResponse;
  constructor(private tmdb: TmdbService) { }

  ngOnInit() {
  }

  sdSearchMovie(txt: string) {
    if (!txt) {
      return;
    }
    this.tmdb.searchMovie({query: txt}).then(
      res => this.currentSearchResMovie = res
    );
  }

  sdSearchActor(txt: string) {
    if (!txt) {
      return;
    }
    this.tmdb.searchPerson({query: txt}).then(
      res => this.currentSearchResActor = res
    );
  }

  gotoMovie(id: number) {
    this.tmdb.getMovie(id);
  }

  gotoActor(id: number) {
    this.tmdb.getPerson(id);
  }

}
