import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario: Usuario;

  constructor(private spinner: NgxSpinnerService,
    private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.loadProfile();
  }

  showSpinner() {
    this.spinner.show();
  }
  hideSpinner() {
    this.spinner.hide();
  }

  loadProfile() {
    this.showSpinner();

    const userData = JSON.parse(localStorage.getItem('user'));

    this.usuarioService.getUsuario(userData.uid)
      .subscribe(res => {
        this.usuarioService.usuario = res as Usuario;
        const user = this.usuarioService.usuario;
        this.usuario = user[0]
        this.hideSpinner();
      })
  }
}
