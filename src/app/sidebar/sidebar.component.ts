import { Component, OnInit } from '@angular/core';
import {SearchMovieResponse} from '../tmdb-data/searchMovie';
import {TmdbService} from '../tmdb.service';
import {SearchPeopleResponse} from '../tmdb-data/SearchPeople';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from 'firebase';
import {filter} from 'rxjs/operators';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})


export class SidebarComponent implements OnInit {

  currentSearchResMovie: SearchMovieResponse;
  currentSearchResActor: SearchPeopleResponse;
  items: any;
  private log: AppComponent;
  private Auser: User;
  constructor(private tmdb: TmdbService, private appCom:AppComponent) {
    this.log = appCom;
  }

  ngOnInit() {
  }

  login(){
    this.log.login();
  }

  logout(){
    this.log.logout();
  }
  sdSearchMovie(txt: string) {
    if (!txt) {
      return;
    }
    this.currentSearchResActor = null;
    this.tmdb.searchMovie({query: txt}).then(
      res => this.currentSearchResMovie = res
    );
  }

  sdSearchActor(txt: string) {
    if (!txt) {
      return;
    }
    this.currentSearchResMovie = null;
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
