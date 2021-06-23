import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Paciente } from 'src/app/models/paciente';
import { PacienteService } from 'src/app/shared/services/paciente.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-editar-paciente',
  templateUrl: './editar-paciente.component.html',
  styleUrls: ['./editar-paciente.component.css']
})
export class EditarPacienteComponent implements OnInit {

  paciente: Paciente;

  usuarios;

  pacienteGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    fecha_nacimiento: new FormControl('', [Validators.required]),
    rut: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [Validators.required]),
    tel_fijo: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(9),
      Validators.pattern('^[0-9]*')
    ]),
    tel_celular: new FormControl('', [
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(12),
      Validators.pattern('^[+0-9]*')
    ]),
    correo: new FormControl('', [Validators.required]),
    escolaridad: new FormControl('', [Validators.required]),
    ocupacion: new FormControl('', [Validators.required]),
    diagnostico: new FormControl('', [Validators.required]),
    dias_hospital: new FormControl('', [Validators.required]),
    examenes_realizados: new FormControl('', [Validators.required]),
    historico_clinica: new FormControl('', [Validators.required]),
    familiar_nombre: new FormControl('', [Validators.required]),
    familiar_parentesco: new FormControl('', [Validators.required]),
    responsables: new FormControl([])
  });

  constructor(private readonly pacienteService: PacienteService,
    private spinner: NgxSpinnerService,
    private usuarioService: UsuarioService,
    public dialogRef: MatDialogRef<EditarPacienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
    this.getPaciente(this.data);
    this.getUsuarios();
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
  getPaciente(idPaciente: string) {
    this.pacienteService.getPaciente(idPaciente)
      .subscribe(res => {
        this.pacienteService.paciente = res as Paciente;
        this.paciente = this.pacienteService.paciente;
        this.paciente.fecha_nacimiento = this.setDateUTC(this.paciente.fecha_nacimiento);
      });
  }

  getUsuarios() {
    this.usuarioService.getUsuarios()
      .subscribe(res => {
        this.usuarioService.usuarios = res as Usuario[];
        const usuarios = this.usuarioService.usuarios;
        this.setUsuariosDisp(usuarios);
      })
  }

  setUsuariosDisp(usuarios) {
    let profesionales = [];
    let supervisories = [];

    usuarios.forEach((usuario: Usuario) => {
      if (usuario.perfil == 'profesional') {
        profesionales.push(usuario);
      }
      else if (usuario.perfil == 'supervisor') {
        supervisories.push(usuario);
      }
    });

    this.usuarios = [
      {
        perfil: 'Profesionales',
        usuarios: profesionales
      },
      {
        perfil: 'Supervisores',
        usuarios: supervisories
      }
    ];

  }

  // Se formatea fecha de nacimiento (UTC)
  setDateUTC(fecha) {
    const date = new Date(fecha);
    date.setDate(date.getUTCDate());
    return date;
  }

  // Actualizar info del paciente
  updatePaciente() {

    this.showSpinner();
    let paciente: Paciente = this.pacienteGroup.value;
    paciente._id = this.paciente._id;
    this.dialogRef.close(paciente);

  }
}
