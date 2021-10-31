import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxSpinnerModule } from 'ngx-spinner';

import { environment } from 'src/environments/environment';

import { MatDialogModule } from '@angular/material/dialog';
import { SubirImagenComponent } from './imagenes/subir-imagen/subir-imagen.component';
import { ImagenesModule } from './imagenes/imagenes.module';
import { EditarImagenComponent } from './imagenes/editar-imagen/editar-imagen.component';
import { EliminarImagenComponent } from './imagenes/eliminar-imagen/eliminar-imagen.component';
import { CrearPacienteComponent } from './pacientes/crear-paciente/crear-paciente.component';
import { EditarPacienteComponent } from './pacientes/editar-paciente/editar-paciente.component';
import { EliminarPacienteComponent } from './pacientes/eliminar-paciente/eliminar-paciente.component';
import { PacientesModule } from './pacientes/pacientes.module';
import { InfoPacienteComponent } from './pacientes/info-paciente/info-paciente.component';
import { RegistroActividadesComponent } from './pacientes/registro-actividades/registro-actividades.component';
import { VentanaInfoComponent } from './shared/ventana-info/ventana-info.component';
import { CrearCategoriaComponent } from './ajustes/categorias/crear-categoria/crear-categoria.component';
import { AjustesModule } from './ajustes/ajustes.module';
import { EditarCategoriaComponent } from './ajustes/categorias/editar-categoria/editar-categoria.component';
import { AuthService } from "./shared/services/auth.service";

import { EditarVerboComponent } from './ajustes/verbos/editar-verbo/editar-verbo.component';
import { CrearVerboComponent } from './ajustes/verbos/crear-verbo/crear-verbo.component';
// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule, AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { LoginModule } from './login/login.module';
import { HomeModule } from './home/home.module';
import { ActividadesModule } from './actividades/actividades.module';

@NgModule({
  declarations: [
    AppComponent,
    VentanaInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    MatDialogModule,
    LoginModule,
    HomeModule,
    ImagenesModule,
    PacientesModule,
    ActividadesModule,
    AjustesModule,
  ],
  entryComponents: [SubirImagenComponent, EditarImagenComponent, EliminarImagenComponent,
    CrearPacienteComponent, InfoPacienteComponent, RegistroActividadesComponent,
    EditarPacienteComponent, EliminarPacienteComponent, VentanaInfoComponent,
    CrearCategoriaComponent, EditarCategoriaComponent, CrearVerboComponent, EditarVerboComponent],
  providers: [AngularFireStorage, AuthService],

  bootstrap: [AppComponent]
})
export class AppModule { }
