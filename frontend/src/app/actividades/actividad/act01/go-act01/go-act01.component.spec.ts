import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoAct01Component } from './go-act01.component';

describe('GoAct01Component', () => {
  let component: GoAct01Component;
  let fixture: ComponentFixture<GoAct01Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoAct01Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoAct01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
