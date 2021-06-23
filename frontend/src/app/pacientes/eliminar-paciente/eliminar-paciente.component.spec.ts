import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarPacienteComponent } from './eliminar-paciente.component';

describe('EliminarPacienteComponent', () => {
  let component: EliminarPacienteComponent;
  let fixture: ComponentFixture<EliminarPacienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarPacienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
