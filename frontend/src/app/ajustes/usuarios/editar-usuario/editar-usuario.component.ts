import { Component, OnInit, Inject } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

export interface Perfil {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  usuario: Usuario;

  usuarioGroup = new FormGroup({
    auth_id: new FormControl(''),
    nombre: new FormControl('', [Validators.required]),
    correo: new FormControl('', [Validators.required]),
    perfil: new FormControl('', [Validators.required]),
  })

  perfiles: Perfil[] = [
    { value: 'administrador', viewValue: 'Administrador' },
    { value: 'profesional', viewValue: 'Profesional' },
    { value: 'supervisor', viewValue: 'Supervisor' },
    { value: 'paciente', viewValue: 'Paciente' }
  ];

  constructor(private readonly usuarioService: UsuarioService,
    private spinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<EditarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario) { }

  ngOnInit() {
    this.getUsuario(this.data.auth_id);
  }

  showSpinner() {
    this.spinner.show();
  }

  hideSpinner() {
    this.spinner.hide();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  // Se llama al servicio para obtener info del paciente
  getUsuario(idUsuario: string) {
    this.usuarioService.getUsuario(idUsuario)
      .subscribe(res => {
        this.usuarioService.usuario = res as Usuario;
        const usuario = this.usuarioService.usuario;
        this.usuario = usuario[0];
      });
  }

  // Actualizar info del paciente
  updateUsuario() {
    this.showSpinner();
    let usuario: Usuario = this.usuarioGroup.value;
    usuario._id = this.usuario._id;
    usuario.auth_id = this.usuario.auth_id;
    usuario.correo = this.usuario.correo;
    this.dialogRef.close(usuario);

  }
}