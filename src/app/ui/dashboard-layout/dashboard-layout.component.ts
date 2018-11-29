import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { Router } from '@angular/router';
import { LoggedUserService } from '../../services/logged-user.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit {

  name:any;
  mail:any;
  image:any;
  constructor(  private route: ActivatedRoute,
    private router:Router,
    private loggedUserService:LoggedUserService) { }

  ngOnInit() {
    this.name = this.route.snapshot.paramMap.get('name');
    this.mail = this.route.snapshot.paramMap.get('mail');
    this.image = this.route.snapshot.paramMap.get('image');
    this.loggedUserService.setUserDetails(this.name, this.mail, this.image);
  }

}
