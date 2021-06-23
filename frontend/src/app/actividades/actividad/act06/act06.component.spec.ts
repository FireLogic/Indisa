import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Act06Component } from './act06.component';

describe('Act06Component', () => {
  let component: Act06Component;
  let fixture: ComponentFixture<Act06Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Act06Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Act06Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
