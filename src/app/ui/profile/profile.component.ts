import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service'
import { CoordinateSuggestionService } from '../../services/coordinate-suggestion.service';
import { MiniPost } from '../../models/minipost';
import { BusinessSuggestionService } from '../../services/business-suggestion.service';

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
    private coordinateSuggestionService: CoordinateSuggestionService,
    private businessSuggestionService: BusinessSuggestionService
  ) {}

  routedMail:string;
  logged_user_mail:string;
  owner_came:boolean = false;
  userVerified:boolean = false;
  code:number;//code user entered
  token:number;//read from database
  username:string;

  ngOnInit() {
    this.routedMail = atob(this.route.snapshot.paramMap.get('email'));
    //alert(this.routedMail);
    this.logged_user_mail = this.storage.get("email");

    if(this.logged_user_mail == this.routedMail){
      this.owner_came = true;
    }
    this.getUserPosts();
    this.getUserPostsBS();
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
          this.username = postdata[0].name;
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




//############33333333333333333333333333


//function to retrive all business


getUserPostsBS(){
  this.businessSuggestionService.getUsersPosts(this.routedMail)
  .subscribe(
    postdata => {
      for(let x in postdata){

        //console.log(postdata[x].id);
        this.readPostDataBS(postdata[x].id);

      }
    }
  );
}


  //function to retrive data for posts
    //array to hold all post data
    postDataArrayBS = [];
    
    readPostDataBS(id:number){

      this.businessSuggestionService.readPostData(id)
      .subscribe(
        postdata => {
          const postItemBS = new MiniPost();
          postItemBS.id = postdata[0].id;
          postItemBS.title = postdata[0].title;
          postItemBS.description = postdata[0]. description;
          postItemBS.address = postdata[0].address;
          postItemBS.name = postdata[0].name;
          var dateVal = postdata[0].timestamp;
          dateVal = dateVal.split("T");
          postItemBS.date = dateVal[0];
          
          if(postdata[0].certified==1){
            postItemBS.certified=true;
          }else{
            postItemBS.certified=false;
          }

          var voteG = postdata[0].upvote - postdata[0].downvote;
          postItemBS.votegap = voteG;
          postItemBS.upvote = postdata[0].upvote;
          postItemBS.downvote = postdata[0].downvote;
          postItemBS.tags = [];
          this.businessSuggestionService.getTags(postdata[0].id).subscribe(
           
            tags => {
              var i : any ;
              for(i in tags){
                postItemBS.tags.push(tags[i].tag+"");
                //console.log("tags"+ tags[tag].tag);

                if(!this.allBusinessTagArray.includes(tags[i].tag)){
                  this.allBusinessTagArray.push(tags[i].tag);
                  this.readRequestid(tags[i].tag);
  
              }


              }
            });
   
          this.postDataArrayBS.push(postItemBS);
          console.log("post data bs***"+JSON.stringify(postItemBS));
        }
      );

    }



//########################################
//business tags

allBusinessTagArray = [];
allRequestIdArray = [];



readRequestid(tag:string){
//read all request id s include that tag



this.businessSuggestionService.readRequest(tag)
  .subscribe(
    postdata => {
      console.log("id s for tags*****"+JSON.stringify(postdata));
      for(let x in postdata){

 

        //alert("readRequestid"+postdata.length);
        
        if(!this.allRequestIdArray.includes(postdata[x].post_id)){
          this.allRequestIdArray.push(postdata[x].post_id);
          this.readRequest(postdata[x].post_id);

      }

      }
    }
  );
}

postDataArrayBR = [];

readRequest(id:number){
  this.businessSuggestionService.readPostDataRX(id)
  .subscribe(
    postdata => {

      if(postdata.length!=0){

        console.log("all data for given id*****"+JSON.stringify(postdata));
      //alert("readRequest"+postdata.length);
      const postItemBR = new MiniPost();
      postItemBR.id = postdata[0].id;
      postItemBR.title = postdata[0].title;
      postItemBR.description = postdata[0]. description;
      postItemBR.address = postdata[0].address;
      postItemBR.name = postdata[0].name;
      var dateVal = postdata[0].timestamp;
      dateVal = dateVal.split("T");
      postItemBR.date = dateVal[0];
      
      if(postdata[0].certified==1){
        postItemBR.certified=true;
      }else{
        postItemBR.certified=false;
      }

      var voteG = postdata[0].upvote - postdata[0].downvote;
      postItemBR.votegap = voteG;
      postItemBR.upvote = postdata[0].upvote;
      postItemBR.downvote = postdata[0].downvote;
      postItemBR.tags = [];
      this.businessSuggestionService.getTagsRX(postdata[0].id).subscribe(
       
        tags => {
          var i : any ;
          for(i in tags){
            postItemBR.tags.push(tags[i].tag+"");
            //console.log("tags"+ tags[tag].tag);



          }
        });

      this.postDataArrayBR.push(postItemBR);
      console.log("post data array BR***"+JSON.stringify(postItemBR));

      }
    }
  );

}


}






