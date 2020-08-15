import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInterviewerFormComponent } from './add-interviewer-form.component';

describe('AddInterviewerFormComponent', () => {
  let component: AddInterviewerFormComponent;
  let fixture: ComponentFixture<AddInterviewerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInterviewerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInterviewerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
