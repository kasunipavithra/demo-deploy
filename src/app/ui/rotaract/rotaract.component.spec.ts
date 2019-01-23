import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RotaractComponent } from './rotaract.component';

describe('RotaractComponent', () => {
  let component: RotaractComponent;
  let fixture: ComponentFixture<RotaractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RotaractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RotaractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
