import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  namelist: string;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.namelist = params.namelist;
    })
   }

  ngOnInit() {
  }

}
