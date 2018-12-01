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
  

  // We need Http to talk to a remote server.
  constructor(private _http: HttpClient ) { }
 
  // Get list of categories from database via api.
  getSuggestions(searchString: string): Observable<any>{
      return this._http
          .get(this.url+searchString)
          .pipe(map((res: Response) => res.json()));
  }

  getLocation(lat:number,lng:number): Observable<any>{
    return this._http
        .get(this.url2+lat+"/"+lng);
}
}
