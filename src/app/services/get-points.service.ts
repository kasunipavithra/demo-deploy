import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetPointsService {

  constructor() { }


  //location properties
  geolocationPosition;
  lat;
  lng;
  radius;
  zoom;


  initLocation(){
    //set initial values of map

    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
          position => {
              this.geolocationPosition = position,
              this.lat = position.coords.latitude;
              this.lng = position.coords.longitude;
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



}
