import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Act09Component } from './act09.component';

describe('Act09Component', () => {
  let component: Act09Component;
  let fixture: ComponentFixture<Act09Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Act09Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Act09Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
