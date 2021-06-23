import { Component, OnInit, Inject } from '@angular/core';
import { PacienteService } from 'src/app/shared/services/paciente.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { $ } from 'protractor';
import { DataService } from 'src/app/shared/services/data.service';
import { Usuario } from 'src/app/models/usuario';
import { Paciente } from 'src/app/models/paciente';

declare var M: any;

@Component({
  selector: 'app-crear-paciente',
  templateUrl: './crear-paciente.component.html',
  styleUrls: ['./crear-paciente.component.css']
})
export class CrearPacienteComponent implements OnInit {

  responsables = [];

  pacienteGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    fecha_nacimiento: new FormControl('', [Validators.required]),
    rut: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [Validators.required]),
    tel_fijo: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(10),
      Validators.pattern('^[0-9]*')
    ]),
    tel_celular: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(15),
      Validators.pattern('^[+0-9]*')
    ]),
    correo: new FormControl('', [
      Validators.required,
      Validators.email]),
    escolaridad: new FormControl('', [Validators.required]),
    ocupacion: new FormControl('', [Validators.required]),
    diagnostico: new FormControl('', [Validators.required]),
    dias_hospital: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*'),
      Validators.min(0)
    ]),
    examenes_realizados: new FormControl('', [Validators.required]),
    historico_clinica: new FormControl('', [Validators.required]),
    familiar_nombre: new FormControl('', [Validators.required]),
    familiar_parentesco: new FormControl('', [Validators.required]),
  });

  today;

  constructor(private spinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<CrearPacienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.setResponsable();
    this.today = new Date();
  }

  setResponsable() {
    const user: Usuario = JSON.parse(localStorage.getItem('perfil'));
    (user.perfil == 'profesional') ? this.responsables.push(user) : this.responsables;
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

  validDate(date) {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    const fecha = new Date(date);
    if (fecha.getTime() < today.getTime()) {
      return true;
    } else {
      return false;
    }
  }

  addPaciente() {
    this.showSpinner();
    (this.validDate(this.pacienteGroup.value.fecha_nacimiento) ?
      this.closeCreate() :
      M.toast({ html: 'Fecha de nacimiento inválida.', classes: 'red' }));

  }

  closeCreate() {

    const paciente: Paciente = {
      _id: '',
      nombre: this.pacienteGroup.value.nombre,
      responsables: this.responsables,
      fecha_nacimiento: this.pacienteGroup.value.fecha_nacimiento,
      rut: this.pacienteGroup.value.rut,
      direccion: this.pacienteGroup.value.direccion,
      tel_fijo: this.pacienteGroup.value.tel_fijo,
      tel_celular: this.pacienteGroup.value.tel_celular,
      correo: this.pacienteGroup.value.correo,
      escolaridad: this.pacienteGroup.value.escolaridad,
      ocupacion: this.pacienteGroup.value.ocupacion,
      diagnostico: this.pacienteGroup.value.diagnostico,
      dias_hospital: this.pacienteGroup.value.dias_hospital,
      examenes_realizados: this.pacienteGroup.value.examenes_realizados,
      historico_clinica: this.pacienteGroup.value.historico_clinica,
      familiar_nombre: this.pacienteGroup.value.familiar_nombre,
      familiar_parentesco: this.pacienteGroup.value.familiar_parentesco
    };


    this.dialogRef.close(paciente);
  }

}
