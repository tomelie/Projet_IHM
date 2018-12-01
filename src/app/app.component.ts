import { Component } from '@angular/core';
import {TmdbService} from './tmdb.service';
import {MovieResponse} from './tmdb-data/Movie';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth, User} from 'firebase';
import {Observable} from 'rxjs';
import {AngularFireDatabase,AngularFireList} from '@angular/fire/database';
import {filter} from 'rxjs/operators';
import { Liste } from './tmdb-data/List';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private _movie: MovieResponse;
  private _user: User;
  private dbData: Observable<any>;
  private dataB:AngularFireDatabase

  //playlist
  private listsPathPlaylist:string;
  private playlist: AngularFireList<any>;
  private myLists: Liste[];
  //playlist

  constructor(private tmdb: TmdbService, public anAuth: AngularFireAuth, private db: AngularFireDatabase) {
    this.myLists = [];
    tmdb.init('25ea93320b0ede2eb2ce7b2661886a0e');
    this.anAuth.user.pipe(filter( u => !!u )).subscribe( u => {
      this._user = u;
      this.dataB = db;
      this.listsPathPlaylist = `lists/${u.uid}/playlist`;
      const lists = db.list(this.listsPathPlaylist);
      this.dbData = lists.valueChanges();
      //playlist
      this.playlist = db.list(this.listsPathPlaylist);
      this.playlist.snapshotChanges().subscribe( data => {
        data.forEach(value => {
          const alist: Liste = {
            nom: value.payload.val().nom,
            films: value.payload.val().films
          };
          this.myLists.push(alist);
        });
      });
      //playlist
    });
    // setTimeout( () =>
    //   tmdb.init('fa7257552d5c28ea58a4b8867f6326e8') // Clef de TMDB
    //       .getMovie(13)
    //       .then( (m: MovieResponse) => console.log('Movie 13:', this._movie = m) )
    //       .catch( err => console.error('Error getting listmovie:', err) ),
    //   1000 );

  }

  //playlist

  public addPlaylist(name: string){
    let samename = false;
    this.myLists.forEach(function(nom){
      console.log(name);
      if(name == name){
        samename = true;
      }
    });
    if(!samename){
      const alist: Liste = {
        nom: name,
        films: []
      }
      this.playlist.push(alist);
    }
  }

  get showPlaylist(): Liste[]{
    return this.myLists;
  }
  //playlist

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
}
// /yE5d3BUhE8hCnkMUJOo1QDoOGNz.jpg
