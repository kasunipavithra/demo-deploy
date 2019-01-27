
import { Component, OnInit, NgZone, Inject } from '@angular/core';
import { latLng, tileLayer,Map, Layer, marker,icon } from 'leaflet';
import { NewPostService } from '../../services/new-post.service';
import { CoordinateSuggestionService } from '../../services/coordinate-suggestion.service';
import { Post } from '../../models/post';
import { Tag } from '../../models/tag';
import { LoggedUserService } from '../../services/logged-user.service';
import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service'



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
logged_user_mail:string;
userVerified:boolean=false;

constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService, private zone: NgZone, private newPostService:NewPostService, private coordinateSuggestionService:CoordinateSuggestionService,private loggedUserService:LoggedUserService ) { }

fitBounds: any = null;

ngOnInit() {
  //alert(this.newPostService.test);
  this.getAllTags();
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

this.logged_user_mail = this.storage.get("email");

this.readVerified(this.logged_user_mail);

}

onMapReady(map: Map) {
    map.on('click', <LeafletMouseEvent>(e) => {
      this.searchstring ="";
      this.selectedLevel ="";
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
  this.current_lat=latitude;
  this.current_lng=longitude;
  this.center =latLng(latitude,longitude);
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
      this.selectedLevel = customers[0]
      this.addMarker(customers[0].lat,customers[0].lon)
      
    }
    );

}

//drop down
selectedLevel;
data;

  selectedPoint(){
   // alert("lat:"+this.selectedLevel.lat+"lon"+ this.selectedLevel.lon);
    this.location = "";
    this.center =latLng(this.selectedLevel.lat,this.selectedLevel.lon);
    this.addMarker(this.selectedLevel.lat,this.selectedLevel.lon);
    this.getLocation(this.selectedLevel.lat,this.selectedLevel.lon);

  }


  //saving post to db

  addPost(){

    this.post.title = this.title;
    this.post.description = this.description;
    this.tags = this.selTagsArr.toString();
    this.post.tag = this.tags;
    //this.post.address= this.location;
    //alert(this.post.address);
    this.post.lat = this.current_lat;
    this.post.lng = this.current_lng;
    this.post.email = this.logged_user_mail;
    
    if(this.userVerified){
      this.post.certified = 1;
    }else{
      this.post.certified = 0;
    }

    var post_id;
  
    this.newPostService.addPost(this.post)
             .subscribe(
               customers => {
                //console.log(customers);
                post_id = customers.insertId;
                this.postTag(post_id);
               }
              );         
  }

  newTag = new Tag();

  postTag(post_id){
          for(let i in this.selTagsArr){
          
            alert("from post tag"+post_id+"sel tag"+this.selTagsArr[i]);
            this.newTag.post_id = post_id;
            this.newTag.tag = this.selTagsArr[i]; 
            this.newPostService.addTags(this.newTag)
            .subscribe(
              customers => {
              //console.log(customers);
              }
            );
      }

      this.title ="";
      this.description = "";
      this.tags="";
 
      alert("Post created successfully!");


  }


  //Tags dropdown

 
  //Tag Functionality implementation

allTagList=[];

getAllTags(){
  //alert(this.searchstring);
  return this.coordinateSuggestionService.getAllTags()
  .subscribe(
    customers => {
      console.log(customers);
      this.allTagList = customers      
    }
    );
  
  }



mymodel;
valuechange(newValue) {
  this.mymodel = newValue;
  //alert(newValue)

    var len = this.allTagList.length,
        i = 0;
    this.tagsArr =[];
    

    for (; i < len; i++) {
        if (this.allTagList[i].tag.match(newValue) && newValue !="" && this.tagsArr.length<7 && !this.selTagsArr.includes(this.allTagList[i].tag)) {
          this.tagsArr.push(this.allTagList[i].tag);
        }
    }




}



tagsArr =[];
selTagsArr = [];
getTag(tag){
  //alert(tag);
 // if(this.selTagsArr.length<)
  this.selTagsArr.push(tag);
  //remove added tag from tag list
  var index = this.tagsArr.indexOf(tag);
  if (index > -1) {
    this.tagsArr.splice(index, 1);
  }
  //this.selectedPoint();
}

delTag(tag){
  var index = this.selTagsArr.indexOf(tag);
  if (index > -1) {
    this.selTagsArr.splice(index, 1);
    this.tagsArr.push(tag);
  // this.selectedPoint();
  }
}
 
//read whether user is certified
readVerified(email:string){

  this.coordinateSuggestionService.getUserVerified(email)
  .subscribe(
    postdata => {
      //alert(postdata[0].verified);
      if(postdata[0].verified=="1"){
        this.userVerified = true;
      }else{
        this.userVerified=false;
      }
    }
  );

}


  }

 




