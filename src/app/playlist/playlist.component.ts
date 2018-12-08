import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router"
import {MovieResponse} from '../tmdb-data/Movie';
import { AppComponent } from '../app.component';
import {TmdbService} from '../tmdb.service';
import { Liste } from '../tmdb-data/List';
import {FormControl,Validators} from '@angular/forms';
import { MyErrorStateMatcher } from '../sidebar/sidebar.component';


@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  private liste: Liste;
  private otherListsReglex: string = "";
  nameList:string;
  listMovies: MovieResponse[];
  isRename: boolean = false;
  matcher = new MyErrorStateMatcher();
  @Input()
  newName:string;
  aFormControl: FormControl;

  constructor(private tmdb: TmdbService,private router: Router,private route: ActivatedRoute,private appC:AppComponent) {
    this.route.params.subscribe(params => {
      this.nameList = params.namelist;
      this.newName = this.nameList;
      if(appC.lists === null){
        router.navigate(['/home']);
      }
      this.load();
    });
  }

  private load(){
    this.appC.lists.subscribe(value => {
      this.listMovies = [];
      let reglexString = "";
      value.forEach(liste =>{
        if(liste.nom === this.nameList){
          this.liste = liste;
          liste.films.forEach(element => {
            this.tmdb.getMovie(element).then(res => this.listMovies.push(res));
          });
        }else{
          console.log(liste.nom);
          reglexString += liste.nom +"|";
        }
      });
      this.otherListsReglex = reglexString+ " ";
    });
  }


  ngOnInit() {
  }

  get movies():MovieResponse[]{
    return this.listMovies;
  }
  
  activeRename(){
    console.log("test:"+ this.otherListsReglex);
   this.aFormControl = new FormControl('', [
      Validators.required,
      Validators.pattern("(?!("+this.otherListsReglex+"))(.)*"),
    ]);

    this.isRename = !this.isRename;
  }

  reName(){
    if(this.nameList !== this.newName &&  this.newName !== ""){
      console.log(this.newName);
      this.appC.renamePlaylist(this.liste,this.newName);
      this.nameList = this.newName;
    }
    this.activeRename()
  }

  reNameAnnuler(){
    this.newName = this.nameList;
    this.activeRename()
  }

  removePlaylist(){
    this.appC.removePlayList(this.liste);
  }

  

}