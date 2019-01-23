import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginNwsdbComponent } from './login-nwsdb.component';

describe('LoginNwsdbComponent', () => {
  let component: LoginNwsdbComponent;
  let fixture: ComponentFixture<LoginNwsdbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginNwsdbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginNwsdbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
