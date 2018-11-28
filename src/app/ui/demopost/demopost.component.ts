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
    const id = +this.route.snapshot.paramMap.get('id');
    this.customerService.getCustomer(id)
      .subscribe(customer => this.customer = customer);
  }
 
  update(): void {
    this.submitted = true;
    this.customerService.updateCustomer(this.customer)
        .subscribe(() => this.message = "Customer Updated Successfully!");
  }
 
  delete(): void {
    this.submitted = true;
    this.customerService.deleteCustomer(this.customer.id)
        .subscribe(()=> this.message = "Customer Deleted Successfully!");
  }
 
  goBack(): void {
    this.location.back();
  }
}


