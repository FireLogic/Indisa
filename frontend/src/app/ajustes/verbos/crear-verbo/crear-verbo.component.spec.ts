import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearVerboComponent } from './crear-verbo.component';

describe('CrearVerboComponent', () => {
  let component: CrearVerboComponent;
  let fixture: ComponentFixture<CrearVerboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearVerboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearVerboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
