import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrowdmapComponent } from './crowdmap.component';

describe('CrowdmapComponent', () => {
  let component: CrowdmapComponent;
  let fixture: ComponentFixture<CrowdmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrowdmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrowdmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
