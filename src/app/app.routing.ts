import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { MapPanelComponent } from './map/map-panel/map-panel.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  }, {
    path: 'map',
    component: MapPanelComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }