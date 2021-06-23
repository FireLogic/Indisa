import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacientesRoutingModule } from './pacientes-routing.module';
import { ListaPacientesComponent } from './lista-pacientes/lista-pacientes.component';
import { InfoPacienteComponent } from './info-paciente/info-paciente.component';
import { CrearPacienteComponent } from './crear-paciente/crear-paciente.component';
import { EditarPacienteComponent } from './editar-paciente/editar-paciente.component';
import { EliminarPacienteComponent } from './eliminar-paciente/eliminar-paciente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { RegistroActividadesComponent } from './registro-actividades/registro-actividades.component';


@NgModule({
  declarations: [ListaPacientesComponent, InfoPacienteComponent, CrearPacienteComponent, EditarPacienteComponent, EliminarPacienteComponent, RegistroActividadesComponent],
  imports: [
    CommonModule,
    PacientesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule 
  ],
  entryComponents: [CrearPacienteComponent]
})
export class PacientesModule { }
