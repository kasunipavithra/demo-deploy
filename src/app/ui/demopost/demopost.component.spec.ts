import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemopostComponent } from './demopost.component';

describe('DemopostComponent', () => {
  let component: DemopostComponent;
  let fixture: ComponentFixture<DemopostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemopostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemopostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
