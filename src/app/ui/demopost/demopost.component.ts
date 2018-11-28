import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { NewPostService } from '../../services/new-post.service';

 
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-demopost',
  templateUrl: './demopost.component.html',
  styleUrls: ['./demopost.component.css']
})
export class DemopostComponent implements OnInit {

  customer = new Post() ;
  submitted = false;
  message: string;
 
  constructor(
    private customerService: NewPostService,
    private route: ActivatedRoute,
    private location: Location
  ) {}
 
  ngOnInit(): void {
    
  }
 
  newCustomer(): void {
    this.submitted = false;
    this.customer = new Post();
  }
 
 addCustomer() {
   this.submitted = true;
   this.save();
 }
 
  goBack(): void {
    this.location.back();
  }
 
  private save(): void {
    this.customerService.addCustomer(this.customer)
        .subscribe();
  }
}


