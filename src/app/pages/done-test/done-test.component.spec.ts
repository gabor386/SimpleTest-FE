import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoneTestComponent } from './done-test.component';

describe('DoneTestComponent', () => {
  let component: DoneTestComponent;
  let fixture: ComponentFixture<DoneTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoneTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoneTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
