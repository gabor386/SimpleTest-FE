import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCandidatesComponent } from './display-candidates.component';

describe('DisplayCandidatesComponent', () => {
  let component: DisplayCandidatesComponent;
  let fixture: ComponentFixture<DisplayCandidatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayCandidatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
