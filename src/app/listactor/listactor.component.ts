import { Component, Input, OnInit } from '@angular/core';
import { TmdbService } from '../tmdb.service';
import { PersonResponse } from '../tmdb-data/Person';

@Component({
  selector: 'app-listactor',
  templateUrl: './listactor.component.html',
  styleUrls: ['./listactor.component.css'],
})
export class ListactorComponent implements OnInit {
  @Input()
  actors: PersonResponse[];

  constructor(private tmdb: TmdbService) {}

  ngOnInit() {}
}
