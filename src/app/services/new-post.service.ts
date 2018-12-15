import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { Tag } from '../models/tag';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class NewPostService {



 // test = "blabla";

  private customersUrl = 'http://localhost:3000/api/addpost';  // URL to web api
  private customersUrl2 = 'http://localhost:3000/api/addtags';
  constructor( 
    private http: HttpClient
  ) { }
 /*
  getCustomers (): Observable<Post[]> {
    return this.http.get<Post[]>(this.customersUrl)
  }
 
  getCustomer(id: number): Observable<Post> {
    const url = `${this.customersUrl}/${id}`;
    return this.http.get<Post>(url);
  }
*/
  addPost (post: Post): Observable<any> {
    return this.http.post<Post>(this.customersUrl, post, httpOptions);
  }

  addTags (tag: Tag): Observable<Tag> {
    return this.http.post<Tag>(this.customersUrl2, tag, httpOptions);
  }
 
 /* deleteCustomer (customer: Post | number): Observable<Post> {
    const id = typeof customer === 'number' ? customer : customer.id;
    const url = `${this.customersUrl}/${id}`;
 
    return this.http.delete<Post>(url, httpOptions);
  }
 
  updateCustomer (customer: Post): Observable<any> {
    return this.http.put(this.customersUrl, customer, httpOptions);
  }
*/
}
