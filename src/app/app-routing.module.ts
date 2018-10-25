import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainPageComponent }  from './main-page/main-page.component';
import { ListmovieComponent } from './listmovie/listmovie.component';
import { ListactorComponent } from './listactor/listactor.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: MainPageComponent },
  { path: 'movies', component: ListmovieComponent },
  { path: 'actors', component: ListactorComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }