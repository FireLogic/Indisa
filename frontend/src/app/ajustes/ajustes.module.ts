import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AjustesRoutingModule } from './ajustes-routing.module';
import { MenuAjustesComponent } from './menu-ajustes/menu-ajustes.component';
import { MatDividerModule, MatListModule, MatChipsModule, MatIconModule, MatFormFieldModule, MatSelectModule, MatInputModule } from '@angular/material';
import { CategoriasComponent } from './categorias/categorias.component';
import { CrearCategoriaComponent } from './categorias/crear-categoria/crear-categoria.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditarCategoriaComponent } from './categorias/editar-categoria/editar-categoria.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './usuarios/editar-usuario/editar-usuario.component';
import { InfoUsuarioComponent } from './usuarios/info-usuario/info-usuario.component';


@NgModule({
  declarations: [MenuAjustesComponent, CategoriasComponent, CrearCategoriaComponent, EditarCategoriaComponent,
    PerfilComponent, UsuariosComponent, InfoUsuarioComponent, CrearUsuarioComponent,
    EditarUsuarioComponent,],
  imports: [
    CommonModule,
    AjustesRoutingModule,
    MatDividerModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  entryComponents: [CrearUsuarioComponent, InfoUsuarioComponent, EditarUsuarioComponent]
})
export class AjustesModule { }
