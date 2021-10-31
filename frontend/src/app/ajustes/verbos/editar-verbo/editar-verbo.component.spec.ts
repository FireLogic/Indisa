import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarVerboComponent } from './editar-verbo.component';

describe('EditarVerboComponent', () => {
  let component: EditarVerboComponent;
  let fixture: ComponentFixture<EditarVerboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarVerboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarVerboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
