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
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private _movie: MovieResponse;
  private _user: User;
  private dbData: Observable<any> = null;

  //playlist
  private listsPathPlaylist:string;
  private playlist: AngularFireList<any>;
  private myLists: Liste[];
  //playlist

  constructor(public snackBar: MatSnackBar,private tmdb: TmdbService, public anAuth: AngularFireAuth, private db: AngularFireDatabase,private router: Router) {
    this.load();
    // setTimeout( () =>
    //   tmdb.init('fa7257552d5c28ea58a4b8867f6326e8') // Clef de TMDB
    //       .getMovie(13)
    //       .then( (m: MovieResponse) => console.log('Movie 13:', this._movie = m) )
    //       .catch( err => console.error('Error getting listmovie:', err) ),
    //   1000 );

  }

  private load(){
    this.myLists = [];
    this.tmdb.init('25ea93320b0ede2eb2ce7b2661886a0e');
    this.anAuth.user.pipe(filter( u => !!u )).subscribe( u => {
      this._user = u;
      this.listsPathPlaylist = `lists/${u.uid}/playlist`;
      const lists = this.db.list(this.listsPathPlaylist);
      this.dbData = lists.valueChanges();
      this.playlist = this.db.list(this.listsPathPlaylist);
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
    });
  }

  //playlist
  get listname(){
    return this.myLists;
  }

  public renamePlaylist(list:Liste,newName: string){
    list.nom = newName;
    this.playlist.update(list.key,list);
    this.myLists = [];
    this.openMsgAction(" La playliste s'appelle "+ name,1000);
  }

  private findlist(name: string): Liste{
    let alist =null;
    this.myLists.forEach(list =>{
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
    if(this.findlist(name) === null){
      const alist: Liste = {
        nom: name,
        films: []
      };
      this.playlist.push(alist);
      this.myLists = [];
      this.openMsgAction(" La playliste "+ name +" à bien été créer",1000);
    }
  }

  public removePlayList(list: Liste){
    let alist = this.findlist(list.nom);
    if(alist !== null || alist !== undefined){
      console.log('remove ' + alist.nom);
      this.playlist.remove(alist.key);
      this.myLists = [];
      this.openMsgAction(" La playliste "+ alist.nom +" à bien été supprimer",1000);
      this.router.navigate(['/home']);
    }
  }

  public addmovieInplayliste(name: string,movie: MovieResponse){
    let alist = this.findlist(name);
    if(alist !== null){
      const namel = String(movie.id);
      if( alist.films !== undefined){
        alist.films.push(namel);
      }else{
        alist.films = [namel];
      }
      console.log("ajouter le film "+alist+" dans la list " +alist.nom);
      this.playlist.update(alist.key,alist);
      this.myLists = [];
      this.openMsgAction(" Ajouter le film '"+movie.title +"' dans '" + alist.nom+"'",1500);
    }
  }

  public removemovieInplaylist(name: string,movie: MovieResponse){
    let alist = this.findlist(name);
    if(alist !== null){
      if( alist.films !== undefined){
        console.log("av"+alist.films);
        alist.films = this.removeElementList(alist.films,movie.id+"");
        console.log("ap "+alist.films);
        this.playlist.update(alist.key,alist);
        this.myLists = [];
        this.openMsgAction(" Le film a bien été retirer de "+ alist.nom,1500);
      }
    }
  }

  openMsgAction(message: string, aduration:number) {
    this.snackBar.open(message, "Fermer", {
      duration: aduration,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

  //playlist

  private removeElementList(list: string[],element:string): string[]{
    const index: number = list.indexOf(element);
    if (index !== -1) {
        list.splice(index, 1);
    }   
    return list;
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
