import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTemplateFormComponent } from './add-template-form.component';

describe('AddTemplateFormComponent', () => {
  let component: AddTemplateFormComponent;
  let fixture: ComponentFixture<AddTemplateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTemplateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTemplateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
