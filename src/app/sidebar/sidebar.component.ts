import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {SearchMovieResponse} from '../tmdb-data/searchMovie';
import {TmdbService} from '../tmdb.service';
import {SearchPeopleResponse} from '../tmdb-data/SearchPeople';
import { AppComponent } from '../app.component';
import {Observable} from 'rxjs';
import { User } from 'firebase';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

export interface DialogData {
  lists: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
  currentSearchResMovie: SearchMovieResponse;
  currentSearchResActor: SearchPeopleResponse;
  private appCom: AppComponent;
  private regexlist: string;

  constructor(private tmdb: TmdbService,public dialog: MatDialog, private appC:AppComponent) {
    this.appCom = appC;
  }
  openDialog(): void {
    this.buildregex();
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {lists:this.regexlist}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("resultat :" + result)
      if(result !== undefined){
        this.addListe(result +"");
      }
    });
  }
 
  ngOnInit() {}

  login(){
    this.appCom.login();
  }

  buildregex(){
    let regexString = "";
    this.appCom.listname.forEach(ele => {
      regexString += ele.nom+'|';
    });
    regexString = regexString.substring(0,regexString.length-1);
    console.log(regexString);
    this.regexlist = regexString;
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
  
  private addListe(nomplailyst:string){  
    this.appCom.addPlaylist(nomplailyst);
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

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
} 

@Component({
  selector: 'app-dialog-nom-playlist',
  templateUrl: 'dialog-nom-playlist.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      
    }
  
  aFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern("(?!("+this.data.lists+"))(.)*"),
  ]);
  matcher = new MyErrorStateMatcher();
  onNoClick(): void {
    this.dialogRef.close();
  }

}