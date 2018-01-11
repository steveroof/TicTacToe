import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OuterFrameComponent } from './outer-frame.component';

describe('OuterFrameComponent', () => {
  let component: OuterFrameComponent;
  let fixture: ComponentFixture<OuterFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OuterFrameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OuterFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
