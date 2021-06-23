import { Component, OnInit } from '@angular/core';
import { ActividadService } from 'src/app/shared/services/actividad.service';
import { Router } from '@angular/router';
import { Actividad } from 'src/app/models/actividad';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constantes } from 'src/app/shared/utils/constantes';
import { TareaService } from 'src/app/shared/services/tarea.service';
import { Tarea } from 'src/app/models/tarea';
import { Paciente } from 'src/app/models/paciente';
import { FunctionExpr } from '@angular/compiler';
import { MatDialog } from '@angular/material';
import { VentanaInfoComponent } from 'src/app/shared/ventana-info/ventana-info.component';
import { DataService } from 'src/app/shared/services/data.service';

declare var M: any;

@Component({
  selector: 'app-lista-actividades',
  templateUrl: './lista-actividades.component.html',
  styleUrls: ['./lista-actividades.component.css']
})

export class ListaActividadesComponent implements OnInit {

  actividades;

  tareas;
  tareasDisponibles;

  permisoActPro = false;
  permisoActBasic = false;

  hayActividades = false;
  hayTareas = false;

  // Colores para las tarjetas de actividades
  colores = [{
    card: 'cyan darken-2',
    btn: 'cyan darken-4'
  },
  {
    card: 'amber darken-2',
    btn: 'amber darken-4'
  },
  {
    card: 'light-green',
    btn: 'light-green darken-3'
  },
  {
    card: 'indigo lighten-1',
    btn: 'indigo darken-3'
  },
  {
    card: 'red lighten-1',
    btn: 'red darken-3'
  },
  {
    card: 'light-blue darken-1',
    btn: 'light-blue darken-4'
  },
  {
    card: 'blue-grey lighten-1',
    btn: 'blue-grey darken-1'
  },

  ];

  // Ruta para cada actividad
  rutas = [
    {
      nombre: 'Actividad 1',
      ruta: 'actividades/actividad-01-play',
    },
    {
      nombre: 'Actividad 2',
      ruta: 'actividades/actividad-02-play',
    },
    {
      nombre: 'Actividad 3',
      ruta: 'actividades/actividad-03-play',
    },
    {
      nombre: 'Actividad 4',
      ruta: 'actividades/actividad-04-play',
    },
    {
      nombre: 'Actividad 5',
      ruta: 'actividades/actividad-05-play',
    },
    {
      nombre: 'Actividad 6',
      ruta: 'actividades/actividad-06-play',
    },
    {
      nombre: 'Actividad 7',
      ruta: 'actividades/actividad-07-play',
    },
  ]


  constructor(private actividadService: ActividadService,
    private tareaService: TareaService,
    private router: Router,
    public dialog: MatDialog,
    private readonly dataService: DataService,
    private spinner: NgxSpinnerService) { }

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

      (permiso == Constantes.actividadesPro) ? this.permisoActPro = true : this.permisoActPro;

      (permiso == Constantes.actividadesBasic) ? this.permisoActBasic = true : this.permisoActBasic;


    });

    if (this.permisoActPro) {
      this.getActividades();
    }
    else if (this.permisoActBasic) {
      this.getActividades();
      this.getTareasActividades();
    }

  }

  // Se evaluan actividades y tareas
  evaluarActs() {

    if (this.hayActividades && this.hayTareas) {
      this.getActividadesDisponibles();
    }
  }

  // Se cargar las actividades disponibles para el paciente
  getActividadesDisponibles() {

    let tareasDisponibles = [];

    this.tareas.forEach(tarea => {
      tarea.actividades.forEach(act => {
        this.actividades.forEach(actividad => {
          if (actividad._id == act.actividad.idActividad && act.realizada == false) {
            const objTarea = {
              paciente: tarea.paciente,
              tarea: act,
              actividad: actividad
            };
            tareasDisponibles.push(objTarea);
          }
        });
      });
    });

    this.tareasDisponibles = tareasDisponibles;
    this.hideSpinner();

  }

  // Se obtienen tareas con actividades para el paciente
  getTareasActividades() {
    this.actividades = [];
    this.tareas = [];

    const pacientesUser = JSON.parse(localStorage.getItem('pacientes'));
    const listaPacientes = pacientesUser.lista;
    let cont = 0;
    let tareasPacientes = [];
    if (listaPacientes.length > 0) {
      listaPacientes.forEach((paciente: Paciente) => {
        cont++;
        this.tareaService.getTarea(paciente._id)
          .subscribe(res => {
            const resRaw = JSON.stringify(res);
            const tareas = JSON.parse(resRaw);
            const modelT = {
              paciente: paciente,
              actividades: tareas
            };
            (tareas.length > 0) ? tareasPacientes.push(modelT) : tareasPacientes;
            (cont == listaPacientes.length) ? this.tareasListas(tareasPacientes) : cont;
          },
            (err) => {
              console.log(err);
              this.tareasDisponibles = [];
            }
          );
      });
    } else {
      this.tareasDisponibles = [];
      this.hideSpinner();
    }

  }

  // Se asignan las tareas pendientes
  tareasListas(tareasPacientes) {

    if (tareasPacientes.length > 0) {
      this.tareas = tareasPacientes;
      this.hayTareas = true;
      this.evaluarActs();
    } else {
      this.tareas = [];
      this.tareasDisponibles = [];
      this.hayTareas = false;
      this.hideSpinner();
    }

  }

  // Abrir actividad pendiente del paciente.
  abrirActividad(tarea) {

    const mensaje = '<div class="text-center mb-2"><b> « ' + tarea.actividad.nombre + ' » </b></div>'
      + '<p class="text-left">' + tarea.actividad.descripcion + '</p>'
      + '<p class="text-left"> <b>Dificultad:</b> ' + tarea.actividad.dificultad + '</p>'
      + '<p class="text-left"> <b>Cant. de imágenes:</b> ' + tarea.tarea.actividad.imagenes.length + '</p>'
      + '<p>¿Desea realizar esta tarea ahora?</p>';
    const tipoMensaje = 'info2';
    let rutaActividad;

    const dialogRef = this.dialog.open(VentanaInfoComponent, {
      maxWidth: '400px',
      data: { mensaje: mensaje, tipo: tipoMensaje },
      autoFocus: false,
      maxHeight: '90vh',
    });

    const datosActividad = {
      idPaciente: tarea.paciente._id,
      idActividad: tarea.actividad._id,
      imagenes: tarea.tarea.actividad.imagenes,
      tarea: true,
      datosTarea: tarea.tarea
    }

    this.rutas.forEach(objRuta => {
      if (tarea.actividad.nombre == objRuta.nombre) {
        rutaActividad = objRuta.ruta;
      }
    });

    dialogRef.afterClosed().subscribe(res => {

      if (res == true) {
        this.dataService.changeMessage(datosActividad);
        this.router.navigate([rutaActividad], { skipLocationChange: true });
      }

    });
  }

  // Se llama al servicio para obtener lista de actividades
  getActividades() {
    this.showSpinner();
    this.actividadService.getActividades()
      .subscribe(res => {
        this.actividadService.actividades = res as Actividad[];
        this.actividades = this.actividadService.actividades;
        this.actividades = this.sortActividades(this.actividades);
        this.hayActividades = true;
        (this.permisoActPro == true) ? this.hideSpinner() : this.evaluarActs();
      });
  }

  // Se oredenan las actividades
  sortActividades(actividades) {

    function compare(a, b) {
      // Use toUpperCase() to ignore character casing
      const bandA = a.nombre.toUpperCase();
      const bandB = b.nombre.toUpperCase();

      let comparison = 0;
      if (bandA > bandB) {
        comparison = 1;
      } else if (bandA < bandB) {
        comparison = -1;
      }
      return comparison;
    }
    return actividades.sort(compare);
  }

  // Ir a la Actividad
  goActividad(i) {
    const numAct = (i + 1);
    this.router.navigate(['/actividades/actividad-0' + numAct]);
  }

  regresar() {
    this.router.navigate(['../']);
  }

}
