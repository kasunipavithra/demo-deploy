import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapPanelComponent } from './map-panel/map-panel.component';

@NgModule({
  exports: [
    MapPanelComponent 
  ],
  imports: [
    CommonModule,
    LeafletModule.forRoot(),
  ],
  declarations: [MapPanelComponent]
})
export class MapModule { }
