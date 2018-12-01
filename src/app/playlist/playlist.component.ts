import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AppComponent } from '../app.component';
import {Router} from "@angular/router";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  private namelist: string;
  private appCom: AppComponent;
  private router: Router;

  constructor(private route: ActivatedRoute,private appC:AppComponent, private myRouter: Router) {
    this.router = myRouter;
    this.appCom = appC;
    this.route.params.subscribe(params => {
      this.namelist = params.namelist;
    })
   }

  ngOnInit() {
  }
  removePlaylist(){
    console.log('test1');
    this.appCom.removePlayList(this.namelist);
    this.router.navigate(['/home']);
  }
}
