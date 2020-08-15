import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayTestsComponent } from './display-tests.component';

describe('DisplayTestsComponent', () => {
  let component: DisplayTestsComponent;
  let fixture: ComponentFixture<DisplayTestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayTestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
