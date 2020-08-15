import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayInterviewersComponent } from './display-interviewers.component';

describe('DisplayInterviewersComponent', () => {
  let component: DisplayInterviewersComponent;
  let fixture: ComponentFixture<DisplayInterviewersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayInterviewersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayInterviewersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
