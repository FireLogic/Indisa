import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoAct09Component } from './go-act09.component';

describe('GoAct09Component', () => {
  let component: GoAct09Component;
  let fixture: ComponentFixture<GoAct09Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoAct09Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoAct09Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
