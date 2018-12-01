
import { Component, OnInit, NgZone } from '@angular/core';
import { latLng, tileLayer,Map, Layer, marker,icon } from 'leaflet';
import { NewPostService } from '../../services/new-post.service';
import { CoordinateSuggestionService } from '../../services/coordinate-suggestion.service';

@Component({
  selector: 'app-drop-pin',
  templateUrl: './drop-pin.component.html',
  styleUrls: ['./drop-pin.component.css']
})
export class DropPinComponent implements OnInit {

  lat;//clicked location
  lng;
  geolocationPosition;
  current_lat;
  current_lng;
  //zoom
  center;
   //retrived from backend for given coordinates
  locations :any[];
  location="";

  errorMsg: string;

  
 // Open Street Map definitions
LAYER_OSM = tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' });

// Values to bind to Leaflet Directive
options = {
  layers: [ this.LAYER_OSM],
  zoom: 15,
  center: latLng(46.879966, -121.726909)
};


markers: Layer[] = [];


constructor(private zone: NgZone, private newPostService:NewPostService, private coordinateSuggestionService:CoordinateSuggestionService ) { }

fitBounds: any = null;

ngOnInit() {
  //alert(this.newPostService.test);
  if (window.navigator && window.navigator.geolocation) {
    window.navigator.geolocation.getCurrentPosition(
        position => {
            this.geolocationPosition = position,
            this.current_lat = position.coords.latitude;
            this.current_lng = position.coords.longitude;
            this.addMarker(this.current_lat,this.current_lng);
            this.getLocation(this.current_lat,this.current_lng);
           
            this.center =latLng(this.current_lat, this.current_lng);
                console.log(position.coords.latitude);
        },
        error => {
            switch (error.code) {
                case 1:
                    console.log('Permission Denied');
                    break;
                case 2:
                    console.log('Position Unavailable');
                    break;
                case 3:
                    console.log('Timeout');
                    break;
            }
        }
    );
};



}

onMapReady(map: Map) {
    map.on('click', <LeafletMouseEvent>(e) => {
      
      console.log(e.latlng.lat,e.latlng.lng);

      this.lat = e.latlng.lat;
      this.lng = e.latlng.lng;
      //run click event on zone 
    	this.zone.run(() => {
        this.fitBounds = this.addMarker(e.latlng.lat,e.latlng.lng);
        this.getLocation(this.lat,this.lng);
      });
    
    });
  }



addMarker(latitude:number,longitude:number) {
  this.markers.pop();
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





getLocation(lat:number,lng:number) {
  console.log("from drop pin ts lat"+lat+"lon"+lng)
  return this.coordinateSuggestionService.getLocation(lat,lng)
             .subscribe(
               customers => {
                console.log(customers);
                this.locations = customers
                this.location = customers.displayName;
               }
              );
}

//get the coordinates of a given string
getCoordinates(){
  
}

}
