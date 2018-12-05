import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  private namelist: string;
  private appCom: AppComponent;

  constructor(private route: ActivatedRoute,private appC:AppComponent) {
    this.appCom = appC;
    this.route.params.subscribe(params => {
      this.namelist = params.namelist;
    })
   }

  ngOnInit() {
  }

  reName(){
    console.log('rename à implémenter');
  }

  removePlaylist(){
    this.appCom.removePlayList(this.namelist);
  }
}
