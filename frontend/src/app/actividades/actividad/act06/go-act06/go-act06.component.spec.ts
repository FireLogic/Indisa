import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoAct06Component } from './go-act06.component';

describe('GoAct06Component', () => {
  let component: GoAct06Component;
  let fixture: ComponentFixture<GoAct06Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoAct06Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoAct06Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
