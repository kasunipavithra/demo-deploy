import { Component, OnInit, Inject } from '@angular/core';
import { LoggedUserService } from '../../services/logged-user.service';
import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  logged_user_name:string;
  logged_user_mail:string;
  logged_user_image:any;
  encr_mail:string;

  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService, private loggedUserService:LoggedUserService) { }

  ngOnInit() {
    //this.logged_user_name = this.loggedUserService.logged_user_name;
    //this.logged_user_mail = this.loggedUserService.logged_user_mail;
    //this.logged_user_image = this.loggedUserService.image;
    
    this.logged_user_name = this.storage.get("name");
    this.logged_user_mail = this.storage.get("email");
    this.logged_user_image = this.storage.get("picture");
    
    this.encr_mail = btoa(this.logged_user_mail);

    //this.getFromLocal("name");
    //this.getFromLocal("email");
    //this.getFromLocal("picture");
  }


  openNav() {
    document.getElementById("mySidenav").style.width = "200px";
}

closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

public data:any=[]

getFromLocal(key): void {
  console.log('recieved= key:' + key);
  this.data[key]= this.storage.get(key);
  console.log(this.data);
 }

}
