import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { MapPanelComponent } from './map/map-panel/map-panel.component';
import { LoginComponent } from './login/login.component';
import { DashboardLayoutComponent } from '././ui/dashboard-layout/dashboard-layout.component';
import {  DbDemoComponent } from "./db-demo/db-demo.component";
import { NewpostComponent } from "././ui/newpost/newpost.component";

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  }, {
    path: 'map',
    component: MapPanelComponent
  },{
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent
  },

  {
    path: 'dbdemo',
    component:  DbDemoComponent
  },

  {
    path: 'newpost',
    component:  NewpostComponent
  }

 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }