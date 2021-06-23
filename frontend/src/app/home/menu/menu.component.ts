import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { DataService } from 'src/app/shared/services/data.service';
import { Constantes } from 'src/app/shared/utils/constantes';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  options: FormGroup;
  opened: boolean = true;
  mode: string = 'side';

  usuario: Usuario;

  permisos;

  permisoDashboard = false;
  permisoPacientes = false;
  permisoActividades = false;
  permisoImagenes = false;
  permisoAjustes = false;

  displayName;

  constructor(fb: FormBuilder,
    private router: Router,
    private elementRef: ElementRef,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private dataService: DataService) {


    this.options = fb.group({
      bottom: 0,
      fixed: false,
      top: 0
    });
  }

  ngOnInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.cursor = 'default';
    this.checkSize();
    this.loadProfile();
    this.loadPermissions();
  }

  showSpinner() {
    this.spinner.show();
  }
  hideSpinner() {
    this.spinner.hide();
  }
  // Se carga el perfil del usuario
  loadProfile() {

    this.usuario = JSON.parse(localStorage.getItem('perfil'));

  }

  loadPermissions() {

    const localData = JSON.parse(localStorage.getItem('permisos'));

    const permisos = localData.permisos;

    this.validPermissions(permisos);

  }

  validPermissions(permisos) {

    permisos.forEach(permiso => {
      (permiso == Constantes.menuDashboard) ? this.permisoDashboard = true : this.permisoDashboard;

      (permiso == Constantes.menuPacientes) ? this.permisoPacientes = true : this.permisoPacientes;

      (permiso == Constantes.menuActividades) ? this.permisoActividades = true : this.permisoActividades;

      (permiso == Constantes.menuImagenes) ? this.permisoImagenes = true : this.permisoImagenes;

      (permiso == Constantes.menuAjustes) ? this.permisoAjustes = true : this.permisoAjustes;
    });
  }

  goPerfil() {
    this.router.navigate(['ajustes/perfil'], { skipLocationChange: false });
  }

  signOut() {
    //this.elementRef.nativeElement.ownerDocument.body.style.cursor = 'progress';
    this.authService.SignOut();
  }

  // Menú responsivo
  checkSize() {
    if (window.innerWidth < 500) {
      this.opened = false;
      this.mode = 'over';
    } else {
      this.opened = true;
      this.mode = 'side';
    }
  }

  goHome() {
    this.router.navigate(['home']);
  }

  goDashboard() {
    this.router.navigate(['dashboard']);
  }

  goPacientes() {
    this.router.navigate(['pacientes']);
  }

  goActividades() {
    this.router.navigate(['actividades']);
  }

  goImagenes() {
    this.router.navigate(['imagenes']);
  }

  goAjustes() {
    this.router.navigate(['ajustes']);
  }

}
