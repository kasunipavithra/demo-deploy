import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropPinComponent } from './drop-pin.component';

describe('DropPinComponent', () => {
  let component: DropPinComponent;
  let fixture: ComponentFixture<DropPinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropPinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
