import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TmdbService } from '../tmdb.service';
import { MovieResponse } from '../tmdb-data/Movie';
import { AppComponent } from '../app.component';
import {Observable} from 'rxjs';


export interface DialogData {
  movie: MovieResponse;
  listes: Observable<any>;
  movieComponent: MovieComponent;
}

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit {
  @Input()
  movie: MovieResponse;
  private appCom: AppComponent;
  constructor(public MovieDialog: MatDialog,private appC:AppComponent) {
    this.appCom = appC;
  }

  ngOnInit() {}

  openDialog(): void {
    const dialogRef = this.MovieDialog.open(MovieDialogComponent, {
      width: '50%',
      data: {movie:this.movie, listes:this.listes, movieComponent:this} ,
      autoFocus: false,
    });
  }

  get listes(): Observable<any>{
    return this.appCom.lists;
  }

  private addmovie(nom: string){
    this.addMovieInList(nom,this.movie.id + "");
  }

  public addMovieInList(nom: string,idmovie: string){
    this.appCom.addmovieInplayliste(nom,idmovie);
  }
}

@Component({
  selector: 'app-movie-dialog',
  templateUrl: 'movie.dialog.html',
})
export class MovieDialogComponent {
  details: MovieResponse;
  constructor(
    public tmdb: TmdbService,
    public dialogRef: MatDialogRef<MovieDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    tmdb.getMovie(data.movie.id).then(res => (this.details = res)); 
  }
  
  addmovie(nom: string){
    this.data.movieComponent.addMovieInList(nom,this.data.movie.id+"");
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
