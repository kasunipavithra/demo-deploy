import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbDemoComponent } from './db-demo.component';

describe('DbDemoComponent', () => {
  let component: DbDemoComponent;
  let fixture: ComponentFixture<DbDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
