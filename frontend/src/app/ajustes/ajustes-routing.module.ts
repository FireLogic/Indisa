import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuAjustesComponent } from './menu-ajustes/menu-ajustes.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AuthGuard } from '../shared/guard/auth.guard';


const routes: Routes = [
  { path: '', component: MenuAjustesComponent, canActivate: [AuthGuard] },
  { path: 'categorias', component: CategoriasComponent, canActivate: [AuthGuard] },
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjustesRoutingModule { }
