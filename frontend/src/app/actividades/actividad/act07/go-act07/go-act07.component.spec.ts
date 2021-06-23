import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoAct07Component } from './go-act07.component';

describe('GoAct07Component', () => {
  let component: GoAct07Component;
  let fixture: ComponentFixture<GoAct07Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoAct07Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoAct07Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
