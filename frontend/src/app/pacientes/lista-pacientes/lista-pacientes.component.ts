import { Component, OnInit } from '@angular/core';
import { PacienteService } from 'src/app/shared/services/paciente.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material';
import { CrearPacienteComponent } from '../crear-paciente/crear-paciente.component';
import { Paciente } from 'src/app/models/paciente';
import { InfoPacienteComponent } from '../info-paciente/info-paciente.component';
import { RegistroActividadesComponent } from '../registro-actividades/registro-actividades.component';
import { EliminarPacienteComponent } from '../eliminar-paciente/eliminar-paciente.component';
import { EditarPacienteComponent } from '../editar-paciente/editar-paciente.component';
import { Constantes } from 'src/app/shared/utils/constantes';
import { Usuario } from 'src/app/models/usuario';

declare var M: any;

@Component({
  selector: 'app-lista-pacientes',
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.css']
})
export class ListaPacientesComponent implements OnInit {

  pacientes;

  permisoPacientesBasic = false;
  permisoPacientesPro = false;
  permisoPacientesEdit = false;

  constructor(private pacienteService: PacienteService,
    private router: Router,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.loadPermissions();
  }

  showSpinner() {
    this.spinner.show();
  }
  hideSpinner() {
    this.spinner.hide();
  }


  loadPermissions() {

    const localData = JSON.parse(localStorage.getItem('permisos'));

    const permisos = localData.permisos;

    this.validPermissions(permisos);

  }

  validPermissions(permisos) {

    permisos.forEach(permiso => {
      (permiso == Constantes.pacientesBasic) ? this.permisoPacientesBasic = true : this.permisoPacientesBasic;

      (permiso == Constantes.pacientesPro) ? this.permisoPacientesPro = true : this.permisoPacientesPro;

      (permiso == Constantes.pacientesEdit) ? this.permisoPacientesEdit = true : this.permisoPacientesEdit;

    });

    const user = JSON.parse(localStorage.getItem('perfil'));

    if (this.permisoPacientesPro) {
      this.getPacientesPro();
    }
    else if (this.permisoPacientesBasic) {
      this.getPacientesBasic(user.auth_id);
    }
  }

  // Se llama al servicio para obtener lista de todos los pacientes
  getPacientesPro() {
    this.showSpinner();
    this.pacienteService.getPacientes()
      .subscribe(res => {
        this.pacienteService.pacientes = res as Paciente[];
        this.pacientes = this.pacienteService.pacientes;
        this.pacientes = this.setDateUTC(this.pacientes);
        this.hideSpinner();
      });
  }

  // Se llama al servicio para obtener lista de pacientes disponibles
  getPacientesBasic(idUsuario) {
    this.showSpinner();
    this.pacienteService.getPacientes()
      .subscribe(res => {
        this.pacienteService.pacientes = res as Paciente[];
        const pacientes = this.pacienteService.pacientes;
        let pacientesDisp = [];
        pacientes.forEach((paciente: Paciente) => {
          if (paciente.responsables.length > 0) {
            paciente.responsables.forEach((responsable) => {
              if (responsable == idUsuario) {
                pacientesDisp.push(paciente);
              }
            });
          }
        });
        this.pacientes = pacientesDisp;
        this.pacientes = this.setDateUTC(this.pacientes);
        this.hideSpinner();
      });
  }

  // Se llama al servicio para registrar un nuevo paciente
  crearPaciente() {
    const dialogRef = this.dialog.open(CrearPacienteComponent, {
      width: '800px',
      autoFocus: false,
      maxHeight: '90vh',
      data: { name: 'nothing' }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.pacienteService.postPaciente(res)
          .subscribe(res => {
            this.hideSpinner();
            M.toast({ html: 'Paciente registrado exitosamente!' });
            this.getPacientesPro();
          });
      }

    });
  }

  // Ver detalle del paciente
  verPaciente(idPaciente: string) {

    let Paciente: Paciente;

    this.pacientes.forEach(paciente => {
      if (paciente._id == idPaciente) {
        Paciente = paciente;
      }
    });

    const dialogRef = this.dialog.open(InfoPacienteComponent, {
      width: '800px',
      data: Paciente,
      autoFocus: false,
      maxHeight: '90vh',
    });
  }

  // Se formatea fecha de nacimiento del paciente (UTC)
  setDateUTC(pacientes) {
    pacientes.forEach((paciente: Paciente) => {
      paciente.fecha_nacimiento = new Date(paciente.fecha_nacimiento);
      paciente.fecha_nacimiento.setDate(paciente.fecha_nacimiento.getUTCDate());
    });
    return pacientes;
  }

  // Ver registro histórico de actividades del paciente
  verRegistroActividades(idRegistro: string) {
    const dialogRef = this.dialog.open(RegistroActividadesComponent, {
      width: '800px',
      data: idRegistro,
      autoFocus: false,
      maxHeight: '90vh',
    });
  }

  // Se llama al servicio para editar info del paciente
  editPaciente(idPaciente: string) {

    const dialogRef = this.dialog.open(EditarPacienteComponent, {
      width: '800px',
      data: idPaciente,
      autoFocus: false,
      maxHeight: '90vh'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.pacienteService.putPaciente(res).subscribe(res => {
          this.hideSpinner();
          M.toast({ html: 'Paciente editado exitosamente!' })
          this.getPacientesPro();
        })
      }
    });
  }

  // Se llama al servicio para eliminar un paciente
  deletePaciente(idPaciente: string) {

    let nombrePaciente;

    this.pacientes.forEach(paciente => {
      if (paciente._id == idPaciente) {
        nombrePaciente = paciente.nombre;
      }
    });

    const dialogRef = this.dialog.open(EliminarPacienteComponent, {
      maxWidth: '400px',
      data: nombrePaciente,
    })

    dialogRef.afterClosed().subscribe(res => {

      if (res == true) {
        this.showSpinner();
        this.pacienteService.deletePaciente(idPaciente).subscribe(res => {
          M.toast({ html: 'Paciente eliminado exitosamente!' })
          this.getPacientesPro();
        });
      }
    });

  }

}
