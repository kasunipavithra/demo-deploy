import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { MapPanelComponent } from './map/map-panel/map-panel.component';
import { LoginComponent } from './login/login.component';
import { DashboardLayoutComponent } from '././ui/dashboard-layout/dashboard-layout.component';


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

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }