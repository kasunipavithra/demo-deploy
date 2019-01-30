import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginNonProfitComponent } from './login-non-profit.component';

describe('LoginNonProfitComponent', () => {
  let component: LoginNonProfitComponent;
  let fixture: ComponentFixture<LoginNonProfitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginNonProfitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginNonProfitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
