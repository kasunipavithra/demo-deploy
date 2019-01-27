import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service'
import { CoordinateSuggestionService } from '../../services/coordinate-suggestion.service';
import { MiniPost } from '../../models/minipost';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    @Inject(SESSION_STORAGE) private storage: WebStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private coordinateSuggestionService: CoordinateSuggestionService
  ) {}

  routedMail:string;
  logged_user_mail:string;
  owner_came:boolean = false;
  userVerified:boolean = false;
  code:number;//code user entered
  token:number;//read from database

  ngOnInit() {
    this.routedMail = atob(this.route.snapshot.paramMap.get('email'));
    //alert(this.routedMail);
    this.logged_user_mail = this.storage.get("email");

    if(this.logged_user_mail == this.routedMail){
      this.owner_came = true;
    }
    this.getUserPosts();
    this.readVerified(this.routedMail);
    this.readToken();
  }

    //function to retrive all posts of the profile on email

    getUserPosts(){
      this.coordinateSuggestionService.getUsersPosts(this.routedMail)
      .subscribe(
        postdata => {
          for(let x in postdata){

            //console.log(postdata[x].id);
            this.readPostData(postdata[x].id);

          }
        }
      );
    }


  //function to retrive data for posts
    //array to hold all post data
    postDataArray = [];
    postItem = new MiniPost();
    readPostData(id:number){

      this.coordinateSuggestionService.readPostData(id)
      .subscribe(
        postdata => {
          const postItem = new MiniPost();
          postItem.id = postdata[0].id;
          postItem.title = postdata[0].title;
          postItem.description = postdata[0]. description;
          postItem.address = postdata[0].address;
          postItem.name = postdata[0].name;
          var dateVal = postdata[0].timestamp;
          dateVal = dateVal.split("T");
          postItem.date = dateVal[0];
          
          if(postdata[0].certified==1){
            postItem.certified=true;
          }else{
            postItem.certified=false;
          }

          var voteG = postdata[0].upvote - postdata[0].downvote;
          postItem.votegap = voteG;
          postItem.upvote = postdata[0].upvote;
          postItem.downvote = postdata[0].downvote;
          postItem.tags = [];
          this.coordinateSuggestionService.getTags(postdata[0].id).subscribe(
           
            tags => {
              var i : any ;
              for(i in tags){
                postItem.tags.push(tags[i].tag+"");
                //console.log("tags"+ tags[tag].tag);
              }
            });
   
          this.postDataArray.push(postItem);
          console.log("post data***"+JSON.stringify(this.postItem));
        }
      );

    }

//odering posts on votes

//is certified filter
isVerified:boolean = false;

checkValue(event: any){
  this.isVerified = event;
  //alert(this.isVerified);
}

//end of is certified filter



//read whether user is certified
readVerified(email:string){

  this.coordinateSuggestionService.getUserVerified(email)
  .subscribe(
    postdata => {
      //alert(postdata[0].verified);
      if(postdata[0].verified=="1"){
        this.userVerified = true;
      }else{
        this.userVerified=false;
      }
    }
  );

}


setVerified(email:string){

  this.coordinateSuggestionService.setUserVerified(email)
  .subscribe(
    postdata => {
      alert("User is updated as a verified user");
      location.reload();
    }
  );

}


readToken(){

  this.coordinateSuggestionService.getToken()
  .subscribe(
    postdata => {
      
      this.token = postdata[0].token;
     
    }
  );

}

message:boolean =false;

matchCodes(){

  alert("code:" +this.code+" token:"+this.token);

  if(this.code == this.token){
      this.setVerified(this.routedMail);
  }else{
    this.message = true;
  }

}

valuechange(event){

  this.message = false;
}


}


