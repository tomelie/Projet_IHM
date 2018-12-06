import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router"
import {MovieResponse} from '../tmdb-data/Movie';
import { AppComponent } from '../app.component';
import {TmdbService} from '../tmdb.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  private namelist: string;
  listMovies: MovieResponse[];

  constructor(private tmdb: TmdbService,private router: Router,private route: ActivatedRoute,private appC:AppComponent) {
    this.route.params.subscribe(params => {
      this.namelist = params.namelist;
      if(this.appC.lists === undefined){
        router.navigate(['/home']);
      }
      this.appC.lists.subscribe(value => { 
        value.forEach(liste =>{
          if(liste.nom === this.namelist){
            this.listMovies = [];
            liste.films.forEach(element => {
              this.tmdb.getMovie(element).then(res => this.listMovies.push(res));
            });
          }
        });
      });
    });
    
    
  }

  
  ngOnInit() {
  }

  get movies():MovieResponse[]{
    return this.listMovies;
  }
     

  reName(){
    console.log('rename à implémenter');
  }

  removePlaylist(){
    this.appC.removePlayList(this.namelist);
  }
}
