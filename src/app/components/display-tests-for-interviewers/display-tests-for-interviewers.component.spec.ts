import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayTestsForInterviewersComponent } from './display-tests-for-interviewers.component';

describe('DisplayTestsForInterviewersComponent', () => {
  let component: DisplayTestsForInterviewersComponent;
  let fixture: ComponentFixture<DisplayTestsForInterviewersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayTestsForInterviewersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayTestsForInterviewersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
