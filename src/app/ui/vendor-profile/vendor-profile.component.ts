import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BusinessSuggestionService } from '../../services/business-suggestion.service';
import { MiniPost } from '../../models/minipost';

@Component({
  selector: 'app-vendor-profile',
  templateUrl: './vendor-profile.component.html',
  styleUrls: ['./vendor-profile.component.css']
})
export class VendorProfileComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,private businessSuggestionService: BusinessSuggestionService) { }

  id:string;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id').toString();
    //alert(this.id);

    this.readPostDataBS(this.id);
  }

  //function to retrive data for posts
    //array to hold all post data
    //postDataMyItem = new MiniPost();
    postItemBS = new MiniPost();

    readPostDataBS(id:string){

      this.businessSuggestionService.readPostData(+id)
      .subscribe(
        postdata => {
         
          this.postItemBS.id = postdata[0].id;
          this.postItemBS.title = postdata[0].title;
          this.postItemBS.description = postdata[0]. description;
          this.postItemBS.address = postdata[0].address;
          this.postItemBS.name = postdata[0].name;
          var dateVal = postdata[0].timestamp;
          dateVal = dateVal.split("T");
          this.postItemBS.date = dateVal[0];
          
          if(postdata[0].certified==1){
            this.postItemBS.certified=true;
          }else{
            this.postItemBS.certified=false;
          }

          var voteG = postdata[0].upvote - postdata[0].downvote;
          this.postItemBS.votegap = voteG;
          this.postItemBS.upvote = postdata[0].upvote;
          this.postItemBS.downvote = postdata[0].downvote;
          this.postItemBS.tags = [];
          this.businessSuggestionService.getTags(postdata[0].id).subscribe(
           
            tags => {
              var i : any ;
              for(i in tags){
                this.postItemBS.tags.push(tags[i].tag+"");
                //console.log("tags"+ tags[tag].tag);
              }
            });
   
         
          //console.log("post data bs***"+JSON.stringify(postItemBS));
        }
      );

    }

}
