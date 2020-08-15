import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrChartsComponent } from './hr-charts.component';

describe('HrChartsComponent', () => {
  let component: HrChartsComponent;
  let fixture: ComponentFixture<HrChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
