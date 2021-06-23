import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Act03Component } from './act03.component';

describe('Act03Component', () => {
  let component: Act03Component;
  let fixture: ComponentFixture<Act03Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Act03Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Act03Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
