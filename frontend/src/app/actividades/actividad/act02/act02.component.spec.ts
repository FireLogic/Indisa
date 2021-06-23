import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Act02Component } from './act02.component';

describe('Act02Component', () => {
  let component: Act02Component;
  let fixture: ComponentFixture<Act02Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Act02Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Act02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
