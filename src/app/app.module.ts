import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { TmdbService } from './tmdb.service';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatTabsModule,
  MatCardModule,
  MatDialogModule,
  MatGridListModule,
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserComponent } from './user/user.component';
import { ProfileComponent } from './profile/profile.component';
import { OverlayconnexionComponent } from './overlayconnexion/overlayconnexion.component';
import { ActorComponent, ActorDialogComponent } from './actor/actor.component';
import { ListactorComponent } from './listactor/listactor.component';
import { MovieComponent, MovieDialogComponent } from './movie/movie.component';
import { ListmovieComponent } from './listmovie/listmovie.component';
import { AppRoutingModule } from './app-routing.module';
import { MainPageComponent } from './main-page/main-page.component';
import { MatMenuModule } from '@angular/material/menu';
import { NavbarComponent } from './navbar/navbar.component';
import { MatIconModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    UserComponent,
    ProfileComponent,
    OverlayconnexionComponent,
    ActorComponent,
    ActorDialogComponent,
    ListactorComponent,
    MovieComponent,
    ListmovieComponent,
    MovieDialogComponent,
    MainPageComponent,
    NavbarComponent,
  ],
  entryComponents: [ActorDialogComponent, MovieDialogComponent],
  imports: [
    MatMenuModule,
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatTabsModule,
    FormsModule,
    MatCardModule,
    MatDialogModule,
    MatGridListModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatIconModule,
  ],
  providers: [TmdbService],
  bootstrap: [AppComponent],
})
export class AppModule {}
