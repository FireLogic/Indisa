import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImagenesRoutingModule } from './imagenes-routing.module';
import { SubirImagenComponent } from './subir-imagen/subir-imagen.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatSelectModule } from '@angular/material/select';
import { ListaImagenesComponent } from './lista-imagenes/lista-imagenes.component';
import { InfoImagenComponent } from './info-imagen/info-imagen.component';
import { EditarImagenComponent } from './editar-imagen/editar-imagen.component';

import { FileSelectDirective, FileUploadModule } from 'ng2-file-upload';
import { EliminarImagenComponent } from './eliminar-imagen/eliminar-imagen.component';
import { MatInputModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [SubirImagenComponent, ListaImagenesComponent, InfoImagenComponent, EditarImagenComponent, EliminarImagenComponent],
  imports: [
    CommonModule,
    ImagenesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    FileUploadModule,
    MatPaginatorModule
  ],
  entryComponents: [InfoImagenComponent]
})
export class ImagenesModule { }
