import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerbosComponent } from './verbos.component';

describe('VerbosComponent', () => {
  let component: VerbosComponent;
  let fixture: ComponentFixture<VerbosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerbosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerbosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
