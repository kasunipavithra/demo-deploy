import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MapModule } from './map/map.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AppRoutingModule } from "./app.routing";
import { LoginComponent } from './login/login.component';
import { UiModule } from './ui/ui.module';

import { FormsModule } from '@angular/forms';
 
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
 
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    MapModule,
    AppRoutingModule,
    UiModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // for database
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
