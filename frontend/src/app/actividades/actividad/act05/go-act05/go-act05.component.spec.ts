import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoAct05Component } from './go-act05.component';

describe('GoAct05Component', () => {
  let component: GoAct05Component;
  let fixture: ComponentFixture<GoAct05Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoAct05Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoAct05Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
