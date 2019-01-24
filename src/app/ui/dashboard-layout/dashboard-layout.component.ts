import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { LoggedUserService } from '../../services/logged-user.service';
import { User } from '../../models/user';
import { latLng, tileLayer,Map, Layer, marker,icon } from 'leaflet';
import { NewPostService } from '../../services/new-post.service';
import { CoordinateSuggestionService } from '../../services/coordinate-suggestion.service';
import { MiniPost } from '../../models/minipost';
import { Postx } from '../../models/postx';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit {


      /***********************setting up logged user************************* */
      name:any;
      mail:any;
      image:any;
      user=new User();
      massage;
    /***********************setting up logged user ends************************* */

    /*********************************setting up map **************************************** */

    lat;//clicked location
    lng;
    geolocationPosition;
    current_lat;
    current_lng;
    zoom
    center;
      //retrived from backend for given coordinates
    locations :any[];
    location="";
    searchstring:string;
    errorMsg: string;


    //values to be saved

    title:string;
    description:string;
    tags:string;
    address:string;

    //search by location
    radius=10;
    pointsRecieved;

    //search by date
    endDate ;
    startDate;
    startDateStr;
    endDateStr;

    
    // Open Street Map definitions
    LAYER_OSM = tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' });

    // Values to bind to Leaflet Directive
    options = {
    layers: [ this.LAYER_OSM],
    zoom: 15,
    center: latLng(46.879966, -121.726909)
    };


    markers: Layer[] = [];
    //posts : [] =[];

      /*********************************setting up map  ends**************************************** */

      constructor(  
        private route: ActivatedRoute,
        private router:Router,
        private loggedUserService:LoggedUserService,
        private zone: NgZone,
        private newPostService:NewPostService,
        private coordinateSuggestionService:CoordinateSuggestionService,
        private datePipe:DatePipe
        ) { }

        fitBounds: any = null;

      ngOnInit() {

          this.endDate = new Date();
          this.startDate = new Date();
          
          this.startDate.setDate( this.endDate.getDate() - 6 );
          this.startDateStr = this.startDate.toLocaleString();
          var startDateStrArr = this.startDateStr.split(",");
          this.startDateStr = startDateStrArr[0];

          this.endDateStr = this.endDate.toLocaleString();
          var endDateStrArr = this.endDateStr.split(",");
          this.endDateStr = endDateStrArr[0];

          this.getAllTags();

          //alert(this.startDateStr)

        /***********************setting up logged user************************* */
      
    /***********************setting up logged user ends************************* */

      /*********************************setting up map  **************************************** */

      if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
            position => {
                this.geolocationPosition = position,
                this.current_lat = position.coords.latitude;
                this.current_lng = position.coords.longitude;
                this.lat = this.current_lat;
                this.lng = this.current_lng;
              // this.addMarker(this.current_lat,this.current_lng);
                this.getLocation(this.current_lat,this.current_lng);
              
                this.center =latLng(this.current_lat, this.current_lng);
                    console.log(position.coords.latitude);
                    this.selectedPoint();
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

      /*********************************setting up map  ends**************************************** */
      
    }






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
          this.selectedPoint();

        }
        );

    }

    //drop down
    selectedLevel;
    data;

    selectedPoint(){
    // alert("lat:"+this.selectedLevel.lat+"lon"+ this.selectedLevel.lon);
      //alert("radius:"+this.radius);
      

      var QueryStart = new Date(this.startDateStr);
      var QueryEnd = new Date();
      QueryEnd.setDate( QueryEnd.getDate() +1 );
      var qs=  this.datePipe.transform(QueryStart,"yyyy-MM-dd");
      var qe = this.datePipe.transform(QueryEnd,"yyyy-MM-dd");
      //alert("qs:  "+qs+"qe:  "+qe);

      var inLat;
      var inLng;

      if (this.selectedLevel==undefined){
        inLat = this.current_lat;
        inLng = this.current_lng;
      }else{
        inLat = this.selectedLevel.lat;
        inLng = this.selectedLevel.lon;
      }

      this.center =latLng(inLat,inLng);

      
      //get points within given radius
        this.coordinateSuggestionService.getPointsRadius(
        inLat,
        inLng,
        this.radius,
        qs,
        qe)
      .subscribe(
        customers => {
          console.log(customers);
          this.pointsRecieved = customers;
        
        /*  this.pointsRecieved.forEach(function (value) {
                alert(value.lat+"   "+value.lng);
                this.addMarker(value.lat,value.lng);
            });*/

            this.markers = [];
          // this.posts =[];
            var post = new Postx();
            for(let i=0; i<this.pointsRecieved.length; i++){
              if(this.selTagsArr.length>0){

                this.coordinateSuggestionService.getTags(this.pointsRecieved[i].id).subscribe(
                  customers => {
                    console.log("tags of point"+customers);
                    var pointTags= customers;
                    var count = 0;

                  // post.id = this.pointsRecieved[i].id;
                  
                  ///post. = this.pointsRecieved[i].id;
                  // post.id = this.pointsRecieved[i].id;
                    
    /*
                    for(let x in pointTags){
                    
            
                    }
    */
                      for(let key in pointTags){
                        console.log("point tag"+pointTags[key].tag);
                        //tag of post mached to tag in selected tag list
                          if(this.selTagsArr.includes(pointTags[key].tag) && count<1){
                            //markers array does not have the point
                            this.addMarker(this.pointsRecieved[i].lat,this.pointsRecieved[i].lng); //use i instead of 0
                            this.readPostData(this.pointsRecieved[i].id);
                              count ++;
                          }
                      }
                  }
                  );
      


              }else{
                
                this.addMarker(this.pointsRecieved[i].lat,this.pointsRecieved[i].lng); //use i instead of 0
                this.readPostData(this.pointsRecieved[i].id);  
              }
              
                }
                
          
        }
        );

      //this.addMarker(this.selectedLevel.lat,this.selectedLevel.lon);
      //this.getLocation(this.selectedLevel.lat,this.selectedLevel.lon);

    }


    onKeydown(event) {
      if (event.key === "Enter") {
        this.selectedPoint();
        this.postDataArray.sort(function(a, b){
          return a.votegap-b.votegap
      })
      }
    }




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
        this.selectedPoint();
    
    }

    delTag(tag){
        var index = this.selTagsArr.indexOf(tag);
      if (index > -1) {
        this.selTagsArr.splice(index, 1);
        this.tagsArr.push(tag);
        this.selectedPoint();
      }
    }

 
    //function to retrive data for posts
    //array to hold all post data

    
    postDataArray = [];
    postItem = new MiniPost();
    readPostData(id:number){

      this.coordinateSuggestionService.readPostData(id)
      .subscribe(
        postdata => {
          const postItem = new MiniPost();
          postItem.id = postdata[0].id;
          postItem.title = postdata[0].title;
          postItem.description = postdata[0]. description;
          postItem.address = postdata[0].address;
          postItem.name = postdata[0].name;
          var dateVal = postdata[0].timestamp;
          dateVal = dateVal.split("T");
          postItem.date = dateVal[0];
          
          if(postdata[0].certified==1){
            postItem.certified=true;
          }else{
            postItem.certified=false;
          }

          var voteG = postdata[0].upvote - postdata[0].downvote;
          postItem.votegap = voteG;
          postItem.upvote = postdata[0].upvote;
          postItem.downvote = postdata[0].downvote;
   
  
          this.postDataArray.push(postItem);
          
          console.log("post data***"+JSON.stringify(this.postItem));
        }
      );

    }

//odering posts on votes

//is certified filter
isVerified:boolean = false;

checkValue(event: any){
  this.isVerified = event;
  //alert(this.isVerified);
}

//end of is certified filter
  

}











