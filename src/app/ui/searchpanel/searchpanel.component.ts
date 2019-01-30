
import { Component, OnInit, NgZone } from '@angular/core';
import { latLng, tileLayer,Map, Layer, marker,icon } from 'leaflet';
import { NewPostService } from '../../services/new-post.service';
import { CoordinateSuggestionService } from '../../services/coordinate-suggestion.service';
import { Post } from '../../models/post';
import { LoggedUserService } from '../../services/logged-user.service';
import {SelectModule} from 'ng2-select';

@Component({
  selector: 'app-searchpanel',
  templateUrl: './searchpanel.component.html',
  styleUrls: ['./searchpanel.component.css']
})
export class SearchpanelComponent implements OnInit {

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
  searchstring:string;
  errorMsg: string;
  post = new Post();
  massage;

  //values to be saved

  title:string;
  description:string;
  tags:string;
  address:string;

  
 // Open Street Map definitions
LAYER_OSM = tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' });

// Values to bind to Leaflet Directive
options = {
  layers: [ this.LAYER_OSM],
  zoom: 15,
  center: latLng(46.879966, -121.726909)
};


markers: Layer[] = [];


constructor(private zone: NgZone, private newPostService:NewPostService, private coordinateSuggestionService:CoordinateSuggestionService,private loggedUserService:LoggedUserService ) { }

fitBounds: any = null;

ngOnInit() {
  //alert(this.newPostService.test);
  
  if (window.navigator && window.navigator.geolocation) {
    window.navigator.geolocation.getCurrentPosition(
        position => {
            this.geolocationPosition = position,
            this.current_lat = position.coords.latitude;
            this.current_lng = position.coords.longitude;
            this.lat = this.current_lat;
            this.lng = this.current_lng;
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
                var name = customers.displayName;
                var namearr = name.split(",");
                this.location = namearr[0]+","+namearr[2]+","+namearr[3];
               }
              );
}

//get the suggested coordinates of a given string
getCoordinates(){
  //alert(this.searchstring);
  return this.coordinateSuggestionService.getSuggestions(this.searchstring)
  .subscribe(
    customers => {
      console.log(customers);
      this.data = customers
      
    }
    );

}

//drop down
selectedLevel;
data;

  selectedPoint(){
   // alert("lat:"+this.selectedLevel.lat+"lon"+ this.selectedLevel.lon);
    this.center =latLng(this.selectedLevel.lat,this.selectedLevel.lon);
    this.addMarker(this.selectedLevel.lat,this.selectedLevel.lon);
    this.getLocation(this.selectedLevel.lat,this.selectedLevel.lon);

  }


  //saving post to db

  addPost(){

    this.post.title = this.title;
    this.post.description = this.description;
    this.post.tag = this.tags;
    //this.post.address= this.location;
    //alert(this.post.address);
    this.post.lat = this.current_lat;
    this.post.lng = this.current_lng;
    this.post.email = this.loggedUserService.logged_user_mail;

    return this.newPostService.addPost(this.post)
             .subscribe(
               customers => {
                //console.log(customers);
                alert("Post created successfully!");
                this.title ="";
                this.description = "";
                this.tags="";
                
               }
              );


  }

  


  //Tags dropdown

 
  

 

  
}

 





