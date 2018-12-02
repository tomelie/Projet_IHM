import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TmdbService } from '../tmdb.service';
import { MovieResponse } from '../tmdb-data/Movie';
import { AppComponent } from '../app.component';
import {Observable} from 'rxjs';

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
      data: this.movie,
      autoFocus: false,
    });
  }

  get listes(): Observable<any>{
    return this.appCom.lists;
  }

  addmovie(nom: string){
    this.appCom.addmovieInplayliste(nom,this.movie.id+"");
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
    @Inject(MAT_DIALOG_DATA) public movie: MovieResponse
  ) {
    tmdb.getMovie(movie.id).then(res => (this.details = res));
    console.log(this.details);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
