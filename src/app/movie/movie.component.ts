import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TmdbService } from '../tmdb.service';
import { MovieResponse } from '../tmdb-data/Movie';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit {
  @Input()
  movie: MovieResponse;

  constructor(public MovieDialog: MatDialog) {}

  ngOnInit() {}

  openDialog(): void {
    const dialogRef = this.MovieDialog.open(MovieDialogComponent, {
      width: '250em',
      data: this.movie,
    });
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
