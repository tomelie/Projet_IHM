import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TmdbService } from '../tmdb.service';
import { PersonResponse } from '../tmdb-data/Person';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css'],
})
export class ActorComponent implements OnInit {
  @Input()
  actor: PersonResponse;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ActorDialogComponent, {
      width: '250em',
      data: this.actor,
    });
  }
}

@Component({
  selector: 'app-actor-dialog',
  templateUrl: 'actor.dialog.html',
})
export class ActorDialogComponent {
  details: PersonResponse;

  constructor(
    public tmdb: TmdbService,
    public dialogRef: MatDialogRef<ActorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public actor: PersonResponse
  ) {
    tmdb.getPerson(actor.id).then(res => (this.details = res));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
