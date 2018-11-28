import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class NewPostService {



  test = "blabla";

  private customersUrl = 'http://localhost:3000/api/customers';  // URL to web api
  constructor( 
    private http: HttpClient
  ) { }
 
  getCustomers (): Observable<Post[]> {
    return this.http.get<Post[]>(this.customersUrl)
  }
 
  getCustomer(id: number): Observable<Post> {
    const url = `${this.customersUrl}/${id}`;
    return this.http.get<Post>(url);
  }
 
  addCustomer (customer: Post): Observable<Post> {
    return this.http.post<Post>(this.customersUrl, customer, httpOptions);
  }
 
  deleteCustomer (customer: Post | number): Observable<Post> {
    const id = typeof customer === 'number' ? customer : customer.id;
    const url = `${this.customersUrl}/${id}`;
 
    return this.http.delete<Post>(url, httpOptions);
  }
 
  updateCustomer (customer: Post): Observable<any> {
    return this.http.put(this.customersUrl, customer, httpOptions);
  }
}
