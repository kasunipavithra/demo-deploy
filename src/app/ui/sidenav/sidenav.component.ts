import { Component, OnInit } from '@angular/core';
import { LoggedUserService } from '../../services/logged-user.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  logged_user_name:string;
  logged_user_mail:string;

  constructor(private loggedUserService:LoggedUserService) { }

  ngOnInit() {
    this.logged_user_name = this.loggedUserService.logged_user_name;
    this.logged_user_mail = this.loggedUserService.logged_user_mail;
    
  }


  openNav() {
    document.getElementById("mySidenav").style.width = "200px";
}

closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
}
