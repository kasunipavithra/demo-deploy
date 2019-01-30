import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CoordinateSuggestionService {

  url = "http://localhost:3000/api/coordinate_suggestion/";
  url2 = "http://localhost:3000/api/location_suggestion/";
  urlTag = "http://localhost:3000/api/alltags";
  urlPTag = "http://localhost:3000/api/posttag/";
  

  // We need Http to talk to a remote server.
  constructor(private _http: HttpClient ) { }
 
  // Get list of categories from database via api.
  getSuggestions(searchString: string): Observable<any>{
      return this._http
          .get(this.url+searchString);
  }

  getLocation(lat:number,lng:number): Observable<any>{
    return this._http
        .get(this.url2+lat+"/"+lng);
}

getAllTags(): Observable<any>{
  return this._http
      .get(this.urlTag);
}

getTags(post_id): Observable<any>{
  return this._http
      .get(this.urlPTag+post_id);
}

//SEARCH QUERIES

//GET POINTS WITHIN GIVEN RADIUS LAT LNG
urlRadius = "http://localhost:3000/api/pointsradius/";
getPointsRadius(lat:number,
                lng:number,
                radius:number,
                startDate:string,
                endDate:string
                ): Observable<any>{
  return this._http
      .get(this.urlRadius+lat+"/"+lng+"/"+radius+"/"+startDate+"/"+endDate);
}

urlUser = "http://localhost:3000/api/user/";

getUserDetails(post_id:number): Observable<any>{
return this._http
.get(this.urlUser+post_id);
}

urlPost = "http://localhost:3000/api/readposts/";
readPostData(post_id:number): Observable<any>{
  return this._http
  .get(this.urlPost+post_id);
  }

urlprofilepost = "http://localhost:3000/api/userposts/";
getUsersPosts(email:string): Observable<any>{
  return this._http
  .get(this.urlprofilepost+email);
  }

readTokenUrl = "http://localhost:3000/api/readtoken";
getToken(): Observable<any>{
  return this._http
  .get(this.readTokenUrl);
  }

setTokenUrl = "http://localhost:3000/api/settoken/";
setToken(token:number): Observable<any>{
  return this._http
  .get(this.setTokenUrl+token);
  }


readuserverified = "http://localhost:3000/api/userverified/";
getUserVerified(email:string): Observable<any>{
  return this._http
  .get(this.readuserverified+email);
  }

setuserverified = "http://localhost:3000/api/setuserverified/";
setUserVerified(email:string): Observable<any>{
  return this._http
  .get(this.setuserverified+email);
  }

voteurl = "http://localhost:3000/api/readVote/";
  readVote(id:number, email:string): Observable<any>{
    return this._http
    .get(this.voteurl+id+"/"+email);
    }

    

voteurl2 = "http://localhost:3000/api/insertVote/";
  insertVote(id:number, email:string, vote:string): Observable<any>{
  return this._http
  .get(this.voteurl2+id+"/"+email+"/"+vote);
  }
}
