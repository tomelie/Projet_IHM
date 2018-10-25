import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainPageComponent }  from './main-page/main-page.component';
import { ListmovieComponent } from './listmovie/listmovie.component';
import { ListactorComponent } from './listactor/listactor.component';
import { ProfileComponent }   from './profile/profile.component';

const routes: Routes = [
  { path: 'home', component: MainPageComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'movies', component: ListmovieComponent },
  { path: 'actors', component: ListactorComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }