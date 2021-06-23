import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoAct02Component } from './go-act02.component';

describe('GoAct02Component', () => {
  let component: GoAct02Component;
  let fixture: ComponentFixture<GoAct02Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoAct02Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoAct02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
