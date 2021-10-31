import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constantes } from 'src/app/shared/utils/constantes';

@Component({
  selector: 'app-menu-ajustes',
  templateUrl: './menu-ajustes.component.html',
  styleUrls: ['./menu-ajustes.component.css']
})
export class MenuAjustesComponent implements OnInit {

  permisoPerfil = false;
  permisoCategorias = false;
  permisoUsuarios = false;
  permisoVerbos = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.loadPermissions();
  }

  loadPermissions() {

    const localData = JSON.parse(localStorage.getItem('permisos'));

    const permisos = localData.permisos;

    this.validPermissions(permisos);

  }

  validPermissions(permisos) {

    permisos.forEach(permiso => {

      (permiso == Constantes.perfil) ? this.permisoPerfil = true : this.permisoPerfil;

      (permiso == Constantes.categorias) ? this.permisoCategorias = true : this.permisoCategorias;

      (permiso == Constantes.usuarios) ? this.permisoUsuarios = true : this.permisoUsuarios;

      (permiso == Constantes.verbos) ? this.permisoVerbos = true : this.permisoVerbos;

    });

  }

  goCategorias() {
    this.router.navigate(['ajustes/categorias'], { skipLocationChange: false });
  }

  goPerfil() {
    this.router.navigate(['ajustes/perfil'], { skipLocationChange: false });
  }

  goUsuarios() {
    this.router.navigate(['ajustes/usuarios'], { skipLocationChange: false });
  }
  
  goVerbos(){
    this.router.navigate(['ajustes/verbos'], {skipLocationChange: false});
  } 
   

}
