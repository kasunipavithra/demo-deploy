import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-db-demo',
  templateUrl: './db-demo.component.html',
  styleUrls: ['./db-demo.component.css']
})
export class DbDemoComponent implements OnInit {



  ngOnInit() {
  }
  title = 'JavaSampleApproach';
  description = 'Angular-Firebase Demo';
 
  itemValue = '';
  items: Observable<any[]>;
 
  constructor(public db: AngularFireDatabase) {
    this.items = db.list('items').valueChanges();
  }
 
  onSubmit() {
    this.db.list('/items').push({ content: this.itemValue });
    this.itemValue = '';
  }

}
