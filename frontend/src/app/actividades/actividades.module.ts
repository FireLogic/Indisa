import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActividadesRoutingModule } from './actividades-routing.module';
import { ListaActividadesComponent } from './lista-actividades/lista-actividades.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule, MatInputModule, MatExpansionModule } from '@angular/material';
import { Act01Component } from './actividad/act01/act01.component';
import { GoAct01Component } from './actividad/act01/go-act01/go-act01.component';
import { Act02Component } from './actividad/act02/act02.component';
import { Act03Component } from './actividad/act03/act03.component';
import { GoAct02Component } from './actividad/act02/go-act02/go-act02.component';
import { GoAct03Component } from './actividad/act03/go-act03/go-act03.component';
import { Act04Component } from './actividad/act04/act04.component';
import { Act05Component } from './actividad/act05/act05.component';
import { Act06Component } from './actividad/act06/act06.component';
import { Act07Component } from './actividad/act07/act07.component';
import { GoAct04Component } from './actividad/act04/go-act04/go-act04.component';
import { GoAct05Component } from './actividad/act05/go-act05/go-act05.component';
import { GoAct06Component } from './actividad/act06/go-act06/go-act06.component';
import { GoAct07Component } from './actividad/act07/go-act07/go-act07.component';


@NgModule({
  declarations: [ListaActividadesComponent, Act01Component, GoAct01Component, Act02Component, 
    Act03Component, GoAct02Component, GoAct03Component, Act04Component, Act05Component, Act06Component,
     Act07Component, GoAct04Component, GoAct05Component, GoAct06Component, GoAct07Component],
  imports: [
    CommonModule,
    ActividadesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatExpansionModule
  ]
})
export class ActividadesModule { }
