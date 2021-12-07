import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoAct10Component } from './go-act10.component';

describe('GoAct10Component', () => {
  let component: GoAct10Component;
  let fixture: ComponentFixture<GoAct10Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoAct10Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoAct10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
