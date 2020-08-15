import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHrFormComponent } from './add-hr-form.component';

describe('AddHrFormComponent', () => {
  let component: AddHrFormComponent;
  let fixture: ComponentFixture<AddHrFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHrFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHrFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
