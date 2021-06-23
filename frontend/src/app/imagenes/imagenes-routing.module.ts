import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaImagenesComponent } from './lista-imagenes/lista-imagenes.component';

const routes: Routes = [
  { path: '', component: ListaImagenesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImagenesRoutingModule { }
