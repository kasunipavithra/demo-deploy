import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { MapPanelComponent } from './map/map-panel/map-panel.component';
import { LoginComponent } from './login/login.component';
import { DashboardLayoutComponent } from '././ui/dashboard-layout/dashboard-layout.component';
import {  DbDemoComponent } from "./db-demo/db-demo.component";
import { NewpostComponent } from "././ui/newpost/newpost.component";
import { DemopostComponent } from "././ui/demopost/demopost.component";
import { LoginVendorComponent } from "././ui/login-vendor/login-vendor.component";
import { LoginNwsdbComponent } from "././ui/login-nwsdb/login-nwsdb.component";
import { LoginNonProfitComponent } from "././ui/login-non-profit/login-non-profit.component";
import { RotaractComponent } from './ui/rotaract/rotaract.component';

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
  },

  {
    path: 'login_vendor',
    component:  LoginVendorComponent
  },

  {
    path: 'login_non_profit',
    component:  LoginNonProfitComponent
  },

  {
    path: 'login_nwsdb',
    component:  LoginNwsdbComponent
  },

  {
    path: 'demopost',
    component:  DemopostComponent
  },

  {
    path: 'rotaract',
    component:  RotaractComponent
  },
 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }