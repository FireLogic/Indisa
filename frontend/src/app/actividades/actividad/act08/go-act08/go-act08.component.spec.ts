import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoAct08Component } from './go-act08.component';

describe('GoAct08Component', () => {
  let component: GoAct08Component;
  let fixture: ComponentFixture<GoAct08Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoAct08Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoAct08Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
