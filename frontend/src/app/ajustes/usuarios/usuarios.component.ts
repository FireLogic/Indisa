import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material';
import { Usuario } from 'src/app/models/usuario';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { VentanaInfoComponent } from 'src/app/shared/ventana-info/ventana-info.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { InfoUsuarioComponent } from './info-usuario/info-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';

declare var M: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[];

  constructor(private usuarioService: UsuarioService,
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getUsuarios();
  }

  showSpinner() {
    this.spinner.show();
  }
  hideSpinner() {
    this.spinner.hide();
  }

  // Se llama al servicio para obtener lista de usuarios
  getUsuarios() {
    this.showSpinner();
    this.usuarioService.getUsuarios()
      .subscribe(res => {
        this.usuarioService.usuarios = res as Usuario[];
        this.usuarios = this.usuarioService.usuarios;
        this.hideSpinner();
      });
  }

  // Ver detalle del usuario
  verUsuario(idUsuario: string) {

    let Usuario: Usuario;

    this.usuarios.forEach(usuario => {
      if (usuario.auth_id == idUsuario) {
        Usuario = usuario;
      }
    });

    const dialogRef = this.dialog.open(InfoUsuarioComponent, {
      width: '800px',
      data: Usuario,
      autoFocus: false,
      maxHeight: '90vh',
    });
  }

  // Se llama al servicio para registrar un nuevo usuario
  crearUsuario() {
    const dialogRef = this.dialog.open(CrearUsuarioComponent, {
      width: '700px',
      autoFocus: false,
      maxHeight: '90vh',
      data: { name: 'nothing' }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.usuarioService.postUsuario(res)
          .subscribe(res => {
            this.hideSpinner();
            M.toast({ html: 'Usuario registrado exitosamente!' })
            this.getUsuarios();
          });
      }

    });
  }

  // Se llama al servicio para editar info del usuario
  editUsuario(usuario: string) {

    const dialogRef = this.dialog.open(EditarUsuarioComponent, {
      width: '800px',
      data: usuario,
      autoFocus: false,
      maxHeight: '90vh'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.usuarioService.putUsuario(res).subscribe(res => {
          this.hideSpinner();
          M.toast({ html: 'Usuario editado exitosamente!' })
          this.getUsuarios();
        })
      }
    });
  }

  // Se llama a los servicios para eliminar completamente al usuario
  deleteUsuario(usuario: Usuario) {

    const mensaje = '¿Desea eliminar al usuario <b>' + usuario.nombre + '</b> de manera permanente?'

    const dialogRef = this.dialog.open(VentanaInfoComponent, {
      maxWidth: '400px',
      data: {
        mensaje: mensaje,
        tipo: 'eliminar'
      },
    })

    dialogRef.afterClosed().subscribe(res => {
      if (res == true) {
        this.showSpinner();
        // Se elimina al usuario de Firebase Authentication.
        this.authService.DeleteUser(usuario.correo)
          .subscribe(res => {
            // Se elimina al usuario de la base de datos.
            this.usuarioService.deleteUsuario(usuario._id)
              .subscribe(res => {
                M.toast({ html: 'Usuario eliminado satisfactoriamente.' })
                this.getUsuarios();
              },
                (err) => {
                  this.hideSpinner();

                  M.toast({ html: 'Error al intentar eliminar el usuario.', classes: 'red' });

                });
          },
            (err) => {
              this.hideSpinner();
              M.toast({ html: 'Error al intentar eliminar el usuario.', classes: 'red' });
            }
          )
      }
    });
  }


}