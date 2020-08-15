import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTestTemplateComponent } from './view-test-template.component';

describe('ViewTestTemplateComponent', () => {
  let component: ViewTestTemplateComponent;
  let fixture: ComponentFixture<ViewTestTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTestTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTestTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
