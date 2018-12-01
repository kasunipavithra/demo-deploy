import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { Router } from '@angular/router';
import { LoggedUserService } from '../../services/logged-user.service';
import { User } from '../../models/user';


@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit {

  name:any;
  mail:any;
  image:any;
  user=new User();
  massage;
  constructor(  private route: ActivatedRoute,
    private router:Router,
    private loggedUserService:LoggedUserService) { }

  ngOnInit() {
    this.name = this.route.snapshot.paramMap.get('name');
    this.mail = this.route.snapshot.paramMap.get('mail');
    this.image = this.route.snapshot.paramMap.get('image');
    this.user.name = this.name;
    this.user.email = this.mail;
    this.user.picture = this.image;
   // var path  = this.image.split("_");
   // this.user.picture  = path[1].replace(/\//g, "@");
    console.log(this.image);
    console.log(this.user.picture);
    this.loggedUserService.setUserDetails(this.name, this.mail, this.image);
    return this.loggedUserService.addUser(this.user)
             .subscribe(
               customers => {
                console.log(customers);
                this.massage = customers
               
               }
              );
  }

}
