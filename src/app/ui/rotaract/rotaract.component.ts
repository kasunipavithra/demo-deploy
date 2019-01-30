import { Component, OnInit } from '@angular/core';
import { CoordinateSuggestionService } from '../../services/coordinate-suggestion.service';

@Component({
  selector: 'app-rotaract',
  templateUrl: './rotaract.component.html',
  styleUrls: ['./rotaract.component.css']
})
export class RotaractComponent implements OnInit {

  constructor(private coordinateSuggestionService: CoordinateSuggestionService) { }

  token=0;

  ngOnInit() {
    this.readToken();
  }

  randomToken(){
    this.token = Math.floor(100000 + Math.random() * 900000);
    this.setToken(this.token);
  }


   //function to retrive data for posts
    //array to hold all post data
    
  
    readToken(){

      this.coordinateSuggestionService.getToken()
      .subscribe(
        postdata => {
          
          this.token = postdata[0].token;
         
        }
      );

    }


    setToken(token:number){

      this.coordinateSuggestionService.setToken(token)
      .subscribe(
        postdata => {
          alert("new code is generated");
        }
      );

    }
}
