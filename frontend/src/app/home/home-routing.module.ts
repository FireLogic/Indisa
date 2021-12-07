import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListaPacientesComponent } from '../pacientes/lista-pacientes/lista-pacientes.component';
import { ListaActividadesComponent } from '../actividades/lista-actividades/lista-actividades.component';
import { ListaImagenesComponent } from '../imagenes/lista-imagenes/lista-imagenes.component';
import { MenuAjustesComponent } from '../ajustes/menu-ajustes/menu-ajustes.component';
import { AuthGuard } from '../shared/guard/auth.guard';
import { CategoriasComponent } from '../ajustes/categorias/categorias.component';
import { VerbosComponent} from '../ajustes/verbos/verbos.component';  
import { PerfilComponent } from '../ajustes/perfil/perfil.component';
import { Act01Component } from '../actividades/actividad/act01/act01.component';
import { GoAct01Component } from '../actividades/actividad/act01/go-act01/go-act01.component';
import { Act02Component } from '../actividades/actividad/act02/act02.component';
import { GoAct02Component } from '../actividades/actividad/act02/go-act02/go-act02.component';
import { Act03Component } from '../actividades/actividad/act03/act03.component';
import { GoAct03Component } from '../actividades/actividad/act03/go-act03/go-act03.component';
import { Act04Component } from '../actividades/actividad/act04/act04.component';
import { GoAct04Component } from '../actividades/actividad/act04/go-act04/go-act04.component';
import { Act05Component } from '../actividades/actividad/act05/act05.component';
import { GoAct05Component } from '../actividades/actividad/act05/go-act05/go-act05.component';
import { Act06Component } from '../actividades/actividad/act06/act06.component';
import { GoAct06Component } from '../actividades/actividad/act06/go-act06/go-act06.component';
import { Act07Component } from '../actividades/actividad/act07/act07.component';
import { GoAct07Component } from '../actividades/actividad/act07/go-act07/go-act07.component';
import { UsuariosComponent } from '../ajustes/usuarios/usuarios.component';
import { Constantes } from '../shared/utils/constantes';


import { Act10Component } from '../actividades/actividad/act10/act10.component';
import { GoAct10Component } from '../actividades/actividad/act10/go-act10/go-act10.component';


const routes: Routes = [
  {
    path: '', component: MenuComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { permiso: Constantes.menuDashboard } },
      { path: 'pacientes', component: ListaPacientesComponent, canActivate: [AuthGuard], data: { permiso: Constantes.menuPacientes } },
      { path: 'imagenes', component: ListaImagenesComponent, canActivate: [AuthGuard], data: { permiso: Constantes.menuImagenes } },
      // Actividades
      { path: 'actividades', component: ListaActividadesComponent, canActivate: [AuthGuard], data: { permiso: Constantes.menuActividades } },
      { path: 'actividades/actividad-01', component: Act01Component, canActivate: [AuthGuard], data: { permiso: Constantes.actividadesPro } },
      { path: 'actividades/actividad-01-play', component: GoAct01Component, canActivate: [AuthGuard], data: { permiso: Constantes.actividadesPlay } },
      { path: 'actividades/actividad-02', component: Act02Component, canActivate: [AuthGuard], data: { permiso: Constantes.actividadesPro } },
      { path: 'actividades/actividad-02-play', component: GoAct02Component, canActivate: [AuthGuard], data: { permiso: Constantes.actividadesPlay } },
      { path: 'actividades/actividad-03', component: Act03Component, canActivate: [AuthGuard], data: { permiso: Constantes.actividadesPro } },
      { path: 'actividades/actividad-03-play', component: GoAct03Component, canActivate: [AuthGuard], data: { permiso: Constantes.actividadesPlay } },
      { path: 'actividades/actividad-04', component: Act04Component, canActivate: [AuthGuard], data: { permiso: Constantes.actividadesPro } },
      { path: 'actividades/actividad-04-play', component: GoAct04Component, canActivate: [AuthGuard], data: { permiso: Constantes.actividadesPlay } },
      { path: 'actividades/actividad-05', component: Act05Component, canActivate: [AuthGuard], data: { permiso: Constantes.actividadesPro } },
      { path: 'actividades/actividad-05-play', component: GoAct05Component, canActivate: [AuthGuard], data: { permiso: Constantes.actividadesPlay } },
      { path: 'actividades/actividad-06', component: Act06Component, canActivate: [AuthGuard], data: { permiso: Constantes.actividadesPro } },
      { path: 'actividades/actividad-06-play', component: GoAct06Component, canActivate: [AuthGuard], data: { permiso: Constantes.actividadesPlay } },
      { path: 'actividades/actividad-07', component: Act07Component, canActivate: [AuthGuard], data: { permiso: Constantes.actividadesPro } },
      { path: 'actividades/actividad-07-play', component: GoAct07Component, canActivate: [AuthGuard], data: { permiso: Constantes.actividadesPlay } },
      
      { path: 'actividades/actividad-08', component: Act07Component, canActivate: [AuthGuard], data: { permiso: Constantes.actividadesPro } },
      { path: 'actividades/actividad-08-play', component: GoAct07Component, canActivate: [AuthGuard], data: { permiso: Constantes.actividadesPlay } },
      { path: 'actividades/actividad-09', component: Act07Component, canActivate: [AuthGuard], data: { permiso: Constantes.actividadesPro } },
      { path: 'actividades/actividad-09-play', component: GoAct07Component, canActivate: [AuthGuard], data: { permiso: Constantes.actividadesPlay } },
      { path: 'actividades/actividad-10', component: Act10Component, canActivate: [AuthGuard], data: { permiso: Constantes.actividadesPro } },
      { path: 'actividades/actividad-10-play', component: GoAct10Component, canActivate: [AuthGuard], data: { permiso: Constantes.actividadesPlay } },
      // Ajustes
      { path: 'ajustes', component: MenuAjustesComponent, canActivate: [AuthGuard], data: { permiso: Constantes.menuAjustes } },
      { path: 'ajustes/perfil', component: PerfilComponent, canActivate: [AuthGuard], data: { permiso: Constantes.perfil } },
      { path: 'ajustes/categorias', component: CategoriasComponent, canActivate: [AuthGuard], data: { permiso: Constantes.categorias } },
      { path: 'ajustes/usuarios', component: UsuariosComponent, canActivate: [AuthGuard], data: { permiso: Constantes.usuarios } },
      { path: 'ajustes/verbos', component: VerbosComponent, canActivate: [AuthGuard], data: {permiso: Constantes.verbos} },
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
