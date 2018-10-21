import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css'],
})
export class ActorComponent implements OnInit {
  @Input()
  actor: JSON;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ActorDialogComponent, {
      width: '250em',
      data: {
        actor: this.actor,
      },
    });
  }
}

@Component({
  selector: 'app-actor-dialog',
  templateUrl: 'actor.dialog.html',
})
export class ActorDialogComponent {
  constructor(public dialogRef: MatDialogRef<ActorDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface DialogData {
  data: String;
}
