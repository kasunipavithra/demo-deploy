import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

;
import { Post } from '../models/post';
import { Tag } from '../models/tag';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BusinessSuggestionService {




  url = "http://localhost:3000/api/coordinate_suggestionBS/";
  url2 = "http://localhost:3000/api/location_suggestionBS/";
  urlTag = "http://localhost:3000/api/alltagsBS";
  urlPTag = "http://localhost:3000/api/posttagBS/";
  

  // We need Http to talk to a remote server.
  constructor(private _http: HttpClient, private http: HttpClient ) { }
 
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
urlRadius = "http://localhost:3000/api/pointsradiusBS/";
getPointsRadius(lat:number,
                lng:number,
                radius:number,
                startDate:string,
                endDate:string
                ): Observable<any>{
  return this._http
      .get(this.urlRadius+lat+"/"+lng+"/"+radius+"/"+startDate+"/"+endDate);
}

urlUser = "http://localhost:3000/api/userBS/";

getUserDetails(post_id:number): Observable<any>{
return this._http
.get(this.urlUser+post_id);
}

urlPost = "http://localhost:3000/api/readpostsBS/";
readPostData(post_id:number): Observable<any>{
  return this._http
  .get(this.urlPost+post_id);
  }

urlprofilepost = "http://localhost:3000/api/userpostsBS/";
getUsersPosts(email:string): Observable<any>{
  return this._http
  .get(this.urlprofilepost+email);
  }

readTokenUrl = "http://localhost:3000/api/readtokenBS";
getToken(): Observable<any>{
  return this._http
  .get(this.readTokenUrl);
  }

setTokenUrl = "http://localhost:3000/api/settokenBS/";
setToken(token:number): Observable<any>{
  return this._http
  .get(this.setTokenUrl+token);
  }


readuserverified = "http://localhost:3000/api/userverifiedBS/";
getUserVerified(email:string): Observable<any>{
  return this._http
  .get(this.readuserverified+email);
  }

setuserverified = "http://localhost:3000/api/setuserverifiedBS/";
setUserVerified(email:string): Observable<any>{
  return this._http
  .get(this.setuserverified+email);
  }

voteurl = "http://localhost:3000/api/readVoteBS/";
  readVote(id:number, email:string): Observable<any>{
    return this._http
    .get(this.voteurl+id+"/"+email);
    }

    

voteurl2 = "http://localhost:3000/api/insertVoteBS/";
  insertVote(id:number, email:string, vote:string): Observable<any>{
  return this._http
  .get(this.voteurl2+id+"/"+email+"/"+vote);
  }




  private customersUrl = 'http://localhost:3000/api/addpostBS';  // URL to web api
  private customersUrl2 = 'http://localhost:3000/api/addtagsBS';


  
  addPost (post: Post): Observable<any> {
    return this.http.post<Post>(this.customersUrl, post, httpOptions);
  }

  addTags (tag: Tag): Observable<Tag> {
    return this.http.post<Tag>(this.customersUrl2, tag, httpOptions);
  }

  private customersUrlR = 'http://localhost:3000/api/addpostBSR';  // URL to web api
  private customersUrl2R = 'http://localhost:3000/api/addtagsBSR';


  
  addPostR (post: Post): Observable<any> {
    return this.http.post<Post>(this.customersUrlR, post, httpOptions);
  }

  addTagsR (tag: Tag): Observable<Tag> {
    return this.http.post<Tag>(this.customersUrl2R, tag, httpOptions);
  }


  

  reqtag = "http://localhost:3000/api/taggedRequests/";
  readRequest(tag:string): Observable<any>{
    return this._http
    .get(this.reqtag+tag);
    }



    urlPostX = "http://localhost:3000/api/readpostRX/";
    readPostDataRX(post_id:number): Observable<any>{
      return this._http
      .get(this.urlPostX+post_id);
      }

    urlPTagX = "http://localhost:3000/api/posttagRX/";
    getTagsRX(post_id): Observable<any>{
      return this._http
          .get(this.urlPTagX+post_id);
    }

}


