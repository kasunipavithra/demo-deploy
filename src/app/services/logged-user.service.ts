import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})


export class LoggedUserService {

  private customersUrl = 'http://localhost:3000/api/saveuser';  // URL to web api
  constructor( 
    private http: HttpClient
  ) { }

  logged_user_name: string;
  logged_user_mail: string;
  image:any;
  user:User;

  setUserDetails(name:string, mail:string, image:any){
    this.logged_user_name = name;
    this.logged_user_mail = mail;
    this.image=image;
   
  }

  //update user table if not exist

  addUser (user:User): Observable<User> {
    return this.http.post<User>(this.customersUrl, user, httpOptions);
  }
}
