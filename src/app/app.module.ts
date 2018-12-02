import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MapModule } from './map/map.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AppRoutingModule } from "./app.routing";
import { LoginComponent } from './login/login.component';
import { UiModule } from './ui/ui.module';
import {SelectModule} from 'ng2-select';

import { FormsModule } from '@angular/forms';
 
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
 
import { environment } from '../environments/environment';
import { DbDemoComponent } from './db-demo/db-demo.component';

import { LoggedUserService } from './services/logged-user.service';
import { CoordinateSuggestionService } from './services/coordinate-suggestion.service';

import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
 // FacebookLoginProvider,
} from "angular-6-social-login";

 
// Configs 

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
      
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("398384863458-du8dhdggudm5qebjhs26d949jb780pu3.apps.googleusercontent.com")
        },
          
    ]
  )
  return config;
}



@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    DbDemoComponent
  ],
  imports: [
    BrowserModule,
    MapModule,
    AppRoutingModule,
    UiModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // for database
    HttpClientModule,
    SocialLoginModule,
    SelectModule
  ],

  providers: [{
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  },
  LoggedUserService,
  CoordinateSuggestionService

],
  bootstrap: [AppComponent]
})
export class AppModule { }
