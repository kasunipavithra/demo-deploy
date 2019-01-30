import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoggedUserService } from '../services/logged-user.service';
import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user=new User();
  message;
  public data:any=[]

  constructor( @Inject(SESSION_STORAGE) private storage: WebStorageService,private socialAuthService: AuthService,private router:Router, private loggedUserService:LoggedUserService  ) {}
  
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
        


        this.user.name = userData.name;
        this.user.email = userData.email;
        this.user.picture = userData.image;

        this.saveInLocal("name",userData.name);
        this.saveInLocal("email",userData.email);
        this.saveInLocal("picture",userData.image);


        this.loggedUserService.setUserDetails( userData.name,  userData.email, userData.image);
        this.loggedUserService.addUser(this.user)
             .subscribe(
               customers => {
                console.log(customers);
                this.message = customers
               
               }
              );

              this.router.navigate(['/dashboard']);

            
      }
    );
  }

  ngOnInit() {
  }

  	
  saveInLocal(key, val): void {
    console.log('recieved= key:' + key + 'value:' + val);
    this.storage.set(key, val);
    this.data[key]= this.storage.get(key);
  }

}
