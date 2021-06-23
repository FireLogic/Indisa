import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Paciente } from 'src/app/models/paciente';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-info-paciente',
  templateUrl: './info-paciente.component.html',
  styleUrls: ['./info-paciente.component.css']
})
export class InfoPacienteComponent implements OnInit {

  paciente: Paciente;
  usuarios: Usuario[];
  responsables = [];

  constructor(private readonly usuarioService: UsuarioService,
    public dialogRef: MatDialogRef<InfoPacienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Paciente) { }

  ngOnInit() {
    this.paciente = this.data;
    this.getUsuarios(this.paciente.responsables);
  }

  getUsuarios(responsables) {

    const usuariosResponsables = [];
    let cont = 0;

    responsables.forEach(responsable => {
      cont++;
      this.usuarioService.getUsuario(responsable)
        .subscribe(res => {
          this.usuarioService.usuario = res as Usuario;
          const usuario = this.usuarioService.usuario;
          usuariosResponsables.push(usuario[0]);
          (cont == responsables.length) ? this.setResponsables(usuariosResponsables) : cont;
        })
    });

  }

  setResponsables(usuariosResponsables) {
    this.responsables = usuariosResponsables;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
