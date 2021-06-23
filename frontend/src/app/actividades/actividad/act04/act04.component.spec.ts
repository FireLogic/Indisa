import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Act04Component } from './act04.component';

describe('Act04Component', () => {
  let component: Act04Component;
  let fixture: ComponentFixture<Act04Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Act04Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Act04Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
