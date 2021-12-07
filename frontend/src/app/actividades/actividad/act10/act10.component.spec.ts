import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Act10Component } from './act10.component';

describe('Act10Component', () => {
  let component: Act10Component;
  let fixture: ComponentFixture<Act10Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Act10Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Act10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
