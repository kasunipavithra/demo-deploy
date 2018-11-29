import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggedUserService {

  constructor() { }

  logged_user_name: string;
  logged_user_mail: string;

  setUserDetails(name:string, mail:string){
    this.logged_user_name = name;
    this.logged_user_mail = mail;
  }
}
