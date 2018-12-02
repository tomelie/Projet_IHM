import { Component } from '@angular/core';
import {TmdbService} from './tmdb.service';
import {MovieResponse} from './tmdb-data/Movie';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth, User} from 'firebase';
import {Observable} from 'rxjs';
import {AngularFireDatabase,AngularFireList} from '@angular/fire/database';
import {filter} from 'rxjs/operators';
import { Liste } from './tmdb-data/List';
import {Router} from "@angular/router";

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
  private router: Router;

  //playlist
  private listsPathPlaylist:string;
  private playlist: AngularFireList<any>;
  private myLists: Liste[];
  //playlist

  constructor(private tmdb: TmdbService, public anAuth: AngularFireAuth, private db: AngularFireDatabase,private myRouter: Router) {
    this.router = myRouter;
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
            key: value.key,
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
  get listname(){
    return this.myLists;
  }

  private samelist(name: string): Liste{
    let alist =null;
    this.myLists.forEach(function(list){
      if(list.nom === name){
       alist = list;
      }
    });
    
    if(alist === null){
      return null;
    }else{
      return alist;
    }
    
  }

  public addPlaylist(name: string){
    if(this.samelist(name) === null){
      const alist: Liste = {
        nom: name,
        films: []
      };
      this.playlist.push(alist);
    }
  }

  public removePlayList(name: string){
    let mylist = this.samelist(name);
    if(mylist !== null){
      console.log('remove ' + name);
      this.playlist.remove(mylist.key);
      this.router.navigate(['/home']);
    }
  }

  public addmovieInplayliste(name: string,idFilm: string){
    let mylist = this.samelist(name);
    if(mylist !== null){
      if( mylist.films !== undefined){
        mylist.films.push(idFilm);
      }else{
        mylist.films = [idFilm];
      }
      console.log("ajouter le file "+mylist+" dans la list " +mylist.nom);
      this.playlist.update(mylist.key,mylist);
      this.myLists = [];
    }
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
    this.router.navigate(['/home']);
    this.myLists = [];
  }

  get user(): User {
    return this._user;
  }

  get lists(): Observable<any> {
    return this.dbData;
  }
}
// /yE5d3BUhE8hCnkMUJOo1QDoOGNz.jpg
