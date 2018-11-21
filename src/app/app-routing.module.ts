import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainPageComponent }  from './main-page/main-page.component';
import { ListmovieComponent } from './listmovie/listmovie.component';
import { ListactorComponent } from './listactor/listactor.component';
import { ProfileComponent }   from './profile/profile.component';
import { ListmovieCons } from './listmovie/listmovie.component';

const routes: Routes = [
  { path: 'home', component: MainPageComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'movies/:type', component: ListmovieCons },
  { path: 'movies/research/:search', component: ListmovieCons },
  { path: 'actors', component: ListactorComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
