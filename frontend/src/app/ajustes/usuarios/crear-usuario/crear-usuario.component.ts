import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/shared/services/data.service';
import { timer } from 'rxjs';
import { PacienteService } from 'src/app/shared/services/paciente.service';
import { Paciente } from 'src/app/models/paciente';

declare var M: any;

export interface Perfil {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  timerSubscriber;

  usuario: Usuario;
  pacientes: Paciente[];
  paciente: Paciente;

  defaultNombre = '';
  defaultCorreo = '';

  perfil;
  selectPacientes = false;

  usuarioGroup = new FormGroup({
    auth_id: new FormControl(''),
    nombre: new FormControl('', [Validators.required]),
    correo: new FormControl('', [Validators.required,
    Validators.email]),
    perfil: new FormControl('', [Validators.required]),
  })

  perfiles: Perfil[] = [
    { value: 'administrador', viewValue: 'Administrador' },
    { value: 'profesional', viewValue: 'Profesional' },
    { value: 'supervisor', viewValue: 'Supervisor' },
    //{ value: 'paciente', viewValue: 'Paciente' }
  ];

  constructor(private authService: AuthService,
    private spinner: NgxSpinnerService,
    private readonly dataService: DataService,
    public dialogRef: MatDialogRef<CrearUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
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


  // Timer for response
  observableTimer() {
    const source = timer(0, 500);
    this.timerSubscriber = source.subscribe(val => {
      this.recuperarData();
    });
  }

  // Se recupera la respuesta del servicio para registrar usuario
  recuperarData() {
    let data;
    this.dataService.currentUserInfo.subscribe(res => data = res);
    if (data != 'default message') {
      this.validData(data);
      this.dataService.setInfoUser('default message');
      this.timerSubscriber.unsubscribe();
    }
  }

  // se genera una password random para el nuevo usuario
  generatePassword() {
    var length = 16,
      charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

  // Se llama al servicio para registrar un usuario en Firebase Auth
  registerUserFire() {
    const email = this.usuarioGroup.value.correo;
    const password = this.generatePassword();

    this.authService.SignUp(email, password);
    this.observableTimer();
  }

  // Se valida la respuesta del servicio
  validData(data) {
    (data.user) ? this.addUsuario(data.user.uid) : this.alertData();
  }

  // Se informa sobre error en el servicio
  alertData() {
    M.toast({ html: 'El correo ingresado es inválido o ya existe.', classes: 'red' });
  }

  // Se completa el formulario con el UID proporcionado por Firebase Authentication
  addUsuario(uid) {
    this.usuarioGroup.value.auth_id = uid;

    this.dialogRef.close(this.usuarioGroup.value);
  }

}
