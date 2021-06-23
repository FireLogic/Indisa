import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaPacientesComponent } from './lista-pacientes/lista-pacientes.component';

const routes: Routes = [
  { path: '', component: ListaPacientesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacientesRoutingModule { }
