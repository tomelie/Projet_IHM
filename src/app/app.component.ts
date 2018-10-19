import { Component } from '@angular/core';
import {TmdbService} from './tmdb.service';
import {MovieResponse} from './tmdb-data/Movie';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth, User} from 'firebase';
import {Observable} from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';
import {filter} from 'rxjs/operators';
import {SearchMovieResponse} from './tmdb-data/searchMovie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private _movie: MovieResponse;
  private _user: User;
  private dbData: Observable<any>;
  currentSearchRes: SearchMovieResponse;

  constructor(private tmdb: TmdbService, public anAuth: AngularFireAuth, private db: AngularFireDatabase) {
    tmdb.init('25ea93320b0ede2eb2ce7b2661886a0e');
    this.anAuth.user.pipe(filter( u => !!u )).subscribe( u => {
      this._user = u;
      const listsPath = `lists/${u.uid}`;
      const lists = db.list(listsPath);
      lists.push('coucou');
      this.dbData = lists.valueChanges();
    });
    // setTimeout( () =>
    //   tmdb.init('fa7257552d5c28ea58a4b8867f6326e8') // Clef de TMDB
    //       .getMovie(13)
    //       .then( (m: MovieResponse) => console.log('Movie 13:', this._movie = m) )
    //       .catch( err => console.error('Error getting listmovie:', err) ),
    //   1000 );

  }

  get movie(): MovieResponse {
    return this._movie;
  }

  getPath(path: string): string {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }

  login() {
    this.anAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.anAuth.auth.signOut();
    this._user = undefined;
  }

  get user(): User {
    return this._user;
  }

  get lists(): Observable<any> {
    return this.dbData;
  }

  search(txt: string) {
    if (!txt) {
      return;
    }
    this.tmdb.searchMovie({query: txt}).then(
      res => this.currentSearchRes = res
    );
  }

  gotoMovie(id: number) {
    this.tmdb.getMovie(id);
  }
}
// /yE5d3BUhE8hCnkMUJOo1QDoOGNz.jpg
