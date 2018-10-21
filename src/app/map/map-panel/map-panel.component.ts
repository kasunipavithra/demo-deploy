import { Component, OnInit, NgZone } from '@angular/core';
import { latLng, tileLayer,Map, Layer, marker,icon } from 'leaflet';

@Component({ 
  selector: 'app-map-panel',
  templateUrl: './map-panel.component.html',
  styleUrls: ['./map-panel.component.css']
})

export class MapPanelComponent implements OnInit {

constructor(private zone: NgZone) { }

fitBounds: any = null;

ngOnInit() {}

onMapReady(map: Map) {
    map.on('click', <LeafletMouseEvent>(e) => { console.log(e.latlng.lat,e.latlng.lng);
      //run click event on zone 
    	this.zone.run(() => {
        this.fitBounds = this.addMarker(e.latlng.lat,e.latlng.lng);
      });
    
    });
  }

// Open Street Map definitions
LAYER_OSM = tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' });

// Values to bind to Leaflet Directive
options = {
  layers: [ this.LAYER_OSM],
  zoom: 10,
  center: latLng(46.879966, -121.726909)
};


markers: Layer[] = [];

addMarker(latitude:number,longitude:number) {
  const newMarker = marker(
    [latitude,longitude],
    {
      icon: icon({
        iconSize: [ 25, 41 ],
        iconAnchor: [ 13, 41 ],
        iconUrl: 'leaflet/marker-icon.png',
      shadowUrl: 'leaflet/marker-shadow.png'
      })
    }
  );

  this.markers.push(newMarker);
}

removeMarker() {
  this.markers.pop();
}

}
