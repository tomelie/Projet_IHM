import { Component, OnInit } from '@angular/core';
import {SearchMovieResponse} from '../tmdb-data/searchMovie';
import {TmdbService} from '../tmdb.service';
import {SearchPeopleResponse} from '../tmdb-data/SearchPeople';
import { AppComponent } from '../app.component';
import {Observable} from 'rxjs';
import { User } from 'firebase';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})


export class SidebarComponent implements OnInit {
  currentSearchResMovie: SearchMovieResponse;
  currentSearchResActor: SearchPeopleResponse;
  private appCom: AppComponent;
  constructor(private tmdb: TmdbService, private appC:AppComponent) {
    this.appCom = appC;
  }

  ngOnInit() {
  }

  login(){
    this.appCom.login();
  }

  logout(){
    this.appCom.logout();
  }

  get user(): User {
    return this.appCom.user;
}

  get listes(): Observable<any>{
    return this.appCom.lists;
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
