import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Act05Component } from './act05.component';

describe('Act05Component', () => {
  let component: Act05Component;
  let fixture: ComponentFixture<Act05Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Act05Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Act05Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
