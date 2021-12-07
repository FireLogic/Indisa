import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Act08Component } from './act08.component';

describe('Act08Component', () => {
  let component: Act08Component;
  let fixture: ComponentFixture<Act08Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Act08Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Act08Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
