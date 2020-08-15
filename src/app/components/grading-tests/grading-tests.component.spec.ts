import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradingTestsComponent } from './grading-tests.component';

describe('GradingTestsComponent', () => {
  let component: GradingTestsComponent;
  let fixture: ComponentFixture<GradingTestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradingTestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradingTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
