import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayTestTemplateComponent } from './display-test-template.component';

describe('DisplayTestTemplateComponent', () => {
  let component: DisplayTestTemplateComponent;
  let fixture: ComponentFixture<DisplayTestTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayTestTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayTestTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
