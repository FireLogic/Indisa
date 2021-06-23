import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Act01Component } from './act01.component';

describe('Act01Component', () => {
  let component: Act01Component;
  let fixture: ComponentFixture<Act01Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Act01Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Act01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
