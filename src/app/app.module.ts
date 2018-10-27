import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MapModule } from './map/map.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AppRoutingModule } from "./app.routing";
import { LoginComponent } from './login/login.component';
import { UiModule } from './ui/ui.module';

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
    UiModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
