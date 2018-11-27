
import { Component, OnInit, NgZone } from '@angular/core';
import { latLng, tileLayer,Map, Layer, marker,icon } from 'leaflet';
import { NewPostService } from '../../services/new-post.service';


@Component({
  selector: 'app-drop-pin',
  templateUrl: './drop-pin.component.html',
  styleUrls: ['./drop-pin.component.css']
})
export class DropPinComponent implements OnInit {

  lat;
  lng;
 
constructor(private zone: NgZone, private newPostService:NewPostService ) { }

fitBounds: any = null;

ngOnInit() {
  alert(this.newPostService.test);
}

onMapReady(map: Map) {
    map.on('click', <LeafletMouseEvent>(e) => {
      
      console.log(e.latlng.lat,e.latlng.lng);

      this.lat = e.latlng.lat;
      this.lng = e.latlng.lng;
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
