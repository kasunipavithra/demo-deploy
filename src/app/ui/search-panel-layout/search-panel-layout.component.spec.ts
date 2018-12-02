import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPanelLayoutComponent } from './search-panel-layout.component';

describe('SearchPanelLayoutComponent', () => {
  let component: SearchPanelLayoutComponent;
  let fixture: ComponentFixture<SearchPanelLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPanelLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPanelLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
