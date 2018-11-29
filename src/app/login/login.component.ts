import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private socialAuthService: AuthService,private router:Router, ) {}
  
  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == "linkedin") {
      //socialPlatformProvider = LinkedinLoginProvider.PROVIDER_ID;
    }
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
        // Now sign-in with userData
        // ...
        this.router.navigate(['/dashboard', userData.name, userData.email, userData.image  ]);
            
      }
    );
  }

  ngOnInit() {
  }

}
