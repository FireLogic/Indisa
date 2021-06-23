import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoAct03Component } from './go-act03.component';

describe('GoAct03Component', () => {
  let component: GoAct03Component;
  let fixture: ComponentFixture<GoAct03Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoAct03Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoAct03Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
