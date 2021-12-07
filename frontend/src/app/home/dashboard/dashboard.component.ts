import { Component, OnInit } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { NgxSpinnerService } from 'ngx-spinner';
import { PacienteService } from 'src/app/shared/services/paciente.service';
import { Paciente } from 'src/app/models/paciente';
import { RegistroActividadService } from 'src/app/shared/services/registro-actividad.service';
import { RegistroActividad } from 'src/app/models/registro_actividad';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from 'src/app/shared/services/data.service';
import { Constantes } from 'src/app/shared/utils/constantes';
import { Usuario } from 'src/app/models/usuario';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private pacienteService: PacienteService,
    private readonly registroService: RegistroActividadService,
    private dataService: DataService,
    private spinner: NgxSpinnerService) { }

  paciente: Paciente;
  pacientes: Paciente[];
  pacientesBar: Paciente[];
  pacientesDonut: Paciente[];
  registroActividades;
  registroActividad: RegistroActividad;

  usuario: Usuario;
  tipoPerfil;

  permisoDashboardBasic = false;
  permisoDashboardPro = false;

  defaultPaciente;
  defaultPacienteBar;
  defaultPacienteDonut;

  chartReady = false;
  chartEmpty = false;
  DchartReady = false;
  DchartEmpty = false;

  // barChart
  barChartOptions;
  barChartLabels;
  barChartType;
  barChartLegend;
  barChartData;

  // doughnutChart
  doughnutChartLabels;
  doughnutChartData;
  doughnutChartType;

  ngOnInit() {
    this.loadPermissions();
    this.loadProfile();
  }

  showSpinner() {
    this.spinner.show();
  }
  hideSpinner() {
    this.spinner.hide();
  }

  loadProfile() {

    this.usuario = JSON.parse(localStorage.getItem('perfil'));

    if (this.usuario.perfil == 'administrador') {
      this.getPacientes();
    }
    else if (this.usuario.perfil == 'profesional' || this.usuario.perfil == 'supervisor') {
      this.getPacientesBasic(this.usuario.auth_id);
      this.tipoPerfil = 'multiple';
    }
    else if (this.usuario.perfil == 'paciente') {
      this.getPaciente(this.usuario._id);
      this.tipoPerfil = 'single';
    }
  }

  loadPermissions() {

    const localData = JSON.parse(localStorage.getItem('permisos'));

    const permisos = localData.permisos;

    this.validPermissions(permisos);

  }

  validPermissions(permisos) {

    permisos.forEach(permiso => {
      (permiso == Constantes.dashboardBasic) ? this.permisoDashboardBasic = true : this.permisoDashboardBasic;

      (permiso == Constantes.dashboardPro) ? this.permisoDashboardPro = true : this.permisoDashboardPro;

    });
  }

  // Se llama al servicio para obtener datos del paciente
  getPaciente(id) {
    this.showSpinner();
    this.pacienteService.getPaciente(id)
      .subscribe(res => {
        this.pacienteService.paciente = res as Paciente;
        this.paciente = this.pacienteService.paciente;
        if (this.paciente) {
          this.defaultPaciente = this.paciente._id;
          this.defaultPacienteBar = this.paciente._id;
          this.defaultPacienteDonut = this.paciente._id;
          this.loadChartsDefault(this.defaultPacienteBar, this.defaultPacienteDonut);
          this.hideSpinner();
        } else {
          this.hideSpinner();
        }

      })
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
        const listaPacientes = {
          lista: this.pacientes
        };
        localStorage.setItem('pacientes', JSON.stringify(listaPacientes));
        if (this.pacientes.length > 0) {
          this.pacientesBar = this.pacientes;
          this.pacientesDonut = this.pacientes;
          this.defaultPaciente = this.pacientes[0]._id;
          this.defaultPacienteBar = this.pacientesBar[0]._id;
          this.defaultPacienteDonut = this.pacientesDonut[0]._id;
          this.loadChartsDefault(this.defaultPacienteBar, this.defaultPacienteDonut);
          this.hideSpinner();
        } else {
          this.chartReady = true;
          this.chartEmpty = true;
          this.DchartReady = true;
          this.DchartEmpty = true;
          this.hideSpinner();
        }

      });
  }

  // Se llama al servicio para obtener lista de pacientes
  getPacientes() {
    this.showSpinner();
    this.pacienteService.getPacientes()
      .subscribe(res => {
        this.pacienteService.pacientes = res as Paciente[];
        this.pacientes = this.pacienteService.pacientes;
        if (this.pacientes.length > 0) {
          this.pacientesBar = this.pacienteService.pacientes;
          this.pacientesDonut = this.pacienteService.pacientes;
          this.defaultPaciente = this.pacientes[0]._id;
          this.defaultPacienteBar = this.pacientesBar[0]._id;
          this.defaultPacienteDonut = this.pacientesDonut[0]._id;
          this.loadChartsDefault(this.defaultPacienteBar, this.defaultPacienteDonut);
          this.hideSpinner();
        }
        else {
          this.hideSpinner();
        }
      });
  }

  // Se cargan ambos gráficos por defecto al inicio;
  loadChartsDefault(idPacienteBar, idPacienteDonut) {
    this.verRegistroActividadesBar(idPacienteBar);
    this.verRegistroActividadesDonut(idPacienteDonut);
  }

  // Se llama a cargar barChart
  pacienteSelectedBar(idPaciente: string) {
    this.verRegistroActividadesBar(idPaciente);
  }

  // Se llama a cargar donutChart
  pacienteSelectedDonut(idPaciente: string) {
    this.verRegistroActividadesDonut(idPaciente);
  }

  // Se llama a servicio para obtener registro histórico de actividades
  verRegistroActividadesBar(id) {
    this.registroService.getRegistroActividad(id)
      .subscribe(res => {
        this.registroService.registroActividad = res as RegistroActividad;
        this.registroActividades = this.registroService.registroActividad;
        if (this.registroActividades.length > 0) {
          const registros = this.registroActividades;
          this.calcularDatosBarChart(registros.slice(-10));
          this.hideSpinner();
        }
        else {
          this.chartReady = true;
          this.chartEmpty = true;
          this.hideSpinner();
        }
      });
  }

  // Se llama a servicio para obtener registro histórico de actividades
  verRegistroActividadesDonut(id) {
    this.registroService.getRegistroActividad(id)
      .subscribe(res => {
        this.registroService.registroActividad = res as RegistroActividad;
        this.registroActividades = this.registroService.registroActividad;
        if (this.registroActividades.length > 0) {
          const registros = this.registroActividades;
          this.calcularDatosDonutChart(registros);
          this.hideSpinner();
        }
        else {
          this.DchartReady = true;
          this.DchartEmpty = true;
          this.hideSpinner();
        }
      });
  }

  // Calcular datos a graficar para bar chart
  calcularDatosBarChart(registroActividades) {

    let aprobacionesPaciente = [];
    let actividadesPaciente = [];

    registroActividades.forEach(registro => {
      registro.aprobacion = this.calcularPorcentaje(registro.aprobacion);
      aprobacionesPaciente.push(registro.aprobacion);
      actividadesPaciente.push(registro.actividad.nombre);
    });
    this.barChart(actividadesPaciente, aprobacionesPaciente);
  }

  // Formato de porcentaje de aprobación
  calcularPorcentaje(aprobacion: number) {
    let porcentaje = (aprobacion * 100);
    const porcentajeTrun = porcentaje.toFixed();
    return porcentajeTrun;
  }

  // Calcular datos a graficar para donut chart
  calcularDatosDonutChart(registros) {
    let a1 = 0, a2 = 0, a3 = 0, a4 = 0, a5 = 0, a6 = 0, a7 = 0, a10 = 0;
    let actividades = [];

    if (registros.length > 0) {
      registros.forEach((registro: RegistroActividad) => {
        (registro.actividad.nombre == 'Actividad 1') ? a1++ : a1;
        (registro.actividad.nombre == 'Actividad 2') ? a2++ : a2;
        (registro.actividad.nombre == 'Actividad 3') ? a3++ : a3;
        (registro.actividad.nombre == 'Actividad 4') ? a4++ : a4;
        (registro.actividad.nombre == 'Actividad 5') ? a5++ : a5;
        (registro.actividad.nombre == 'Actividad 6') ? a6++ : a6;
        (registro.actividad.nombre == 'Actividad 7') ? a7++ : a7;
        (registro.actividad.nombre == 'Actividad 10') ? a10++ : a10;
      });

      actividades.push(a1);
      actividades.push(a2);
      actividades.push(a3);
      actividades.push(a4);
      actividades.push(a5);
      actividades.push(a6);
      actividades.push(a7);
      actividades.push(a10);
    } else {
      actividades = [];
    }

    this.doughnutChart(actividades);
  }

  // Se grafica barChart
  barChart(actividades, aprobaciones) {

    (actividades && aprobaciones) ? this.chartReady = true : this.chartReady = false;

    (actividades.length == 0) ? this.chartEmpty = true : this.chartEmpty = false;

    this.barChartOptions = {
      scaleShowVerticalLines: true,
      responsive: true,
      scales: {
        yAxes: [{
          ticks: {
            suggestedMin: 0,
            suggestedMax: 100
          }
        }]
      }
    };

    this.barChartLabels = actividades;
    this.barChartType = 'bar';
    this.barChartLegend = false;
    this.barChartData = [
      {
        data: aprobaciones,
        label: 'Porcentaje de Aprobación',
        backgroundColor: colors(actividades)
      }
    ];

    function colors(acts) {
      let colors = [];
      acts.forEach(act => {
        colors.push("lightblue");
      });
      return colors;
    }

    this.hideSpinner();
  }

  // Se grafica doughnutChart
  doughnutChart(datosActividades) {

    (datosActividades) ? this.DchartReady = true : this.DchartReady = false;

    (datosActividades.length == 0) ? this.DchartEmpty = true : this.DchartEmpty = false;

    this.doughnutChartLabels = ['Actividad 1', 'Actividad 2', 'Actividad 3',
      'Actividad 4', 'Actividad 5', 'Actividad 6', 'Actividad 7', 'Actividad 8', 'Actividad 9', 'Actividad 10'];
    this.doughnutChartData = datosActividades;
    this.doughnutChartType = 'doughnut';

    this.hideSpinner();
  }


}
