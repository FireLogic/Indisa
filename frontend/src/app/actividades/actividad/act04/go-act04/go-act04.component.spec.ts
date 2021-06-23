import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoAct04Component } from './go-act04.component';

describe('GoAct04Component', () => {
  let component: GoAct04Component;
  let fixture: ComponentFixture<GoAct04Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoAct04Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoAct04Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
