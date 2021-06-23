import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Act07Component } from './act07.component';

describe('Act07Component', () => {
  let component: Act07Component;
  let fixture: ComponentFixture<Act07Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Act07Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Act07Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
