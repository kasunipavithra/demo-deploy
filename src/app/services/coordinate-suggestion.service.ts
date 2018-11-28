import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CoordinateSuggestionService {

  url = "http://localhost:3000/api/coordinate_suggestion/";

  // We need Http to talk to a remote server.
  constructor(private _http: Http) { }
 
  // Get list of categories from database via api.
  readCategories(searchString: string): Observable<any>{
      return this._http
          .get(this.url+searchString)
          .pipe(map((res: Response) => res.json()));
  }
}
