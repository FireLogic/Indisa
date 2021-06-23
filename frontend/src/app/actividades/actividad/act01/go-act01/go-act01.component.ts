import { Component, OnInit, Input } from '@angular/core';
import { ImagenService } from 'src/app/shared/services/imagen.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Imagen } from 'src/app/models/imagen';
import { DataService } from 'src/app/shared/services/data.service';
import { RegistroActividadService } from 'src/app/shared/services/registro-actividad.service';
import { RegistroActividad } from 'src/app/models/registro_actividad';
import { MatDialog } from '@angular/material';
import { VentanaInfoComponent } from 'src/app/shared/ventana-info/ventana-info.component';
import { FormControl, Validators } from '@angular/forms';
import { TareaService } from 'src/app/shared/services/tarea.service';
import { Tarea } from 'src/app/models/tarea';

declare var M: any;

@Component({
  selector: 'app-go-act01',
  templateUrl: './go-act01.component.html',
  styleUrls: ['./go-act01.component.css']
})

export class GoAct01Component implements OnInit {

  idPaciente: string;
  idActividad: string;
  registroActividad: RegistroActividad;
  datosActividad: any;
  imagenes;
  imagenesErrores;
  fechaActividad: Date;
  duracionActividad: number;
  cantNiveles: number;
  cantErrores: number;
  aprobacion: number;
  observacionFinal: string;
  numImagen: number;
  finActividad: boolean;
  audioPlayed: boolean;
  hayRegistro: boolean;

  observacionForm = new FormControl('');

  mensajeInfo: string;

  time: number = 0;
  display;
  interval;

  tarea: Tarea;
  hayRegistroAct = false;
  hayRegistroTarea = false;


  constructor(private readonly dataService: DataService,
    private readonly registroService: RegistroActividadService,
    private readonly tareaService: TareaService,
    private spinner: NgxSpinnerService,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getDatosActividad();
    this.fechaActividad = new Date();
    this.numImagen = 0;
    this.finActividad = false;
    this.audioPlayed = false;
    this.startTimer();
    this.hayRegistro = false;
  }

  showSpinner() {
    this.spinner.show();
  }
  hideSpinner() {
    this.spinner.hide();
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.time === 0) {
        this.time++;
      } else {
        this.time++;
      }
      this.display = this.transform(this.time)
    }, 1000);
  }

  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return minutes + ':' + (value - minutes * 60);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  getDatosActividad() {
    this.dataService.currentMessage.subscribe(message => this.datosActividad = message);
    if (this.datosActividad == 'default message') {
      this.regresar();
    } else {
      this.idPaciente = this.datosActividad.idPaciente;
      this.idActividad = this.datosActividad.idActividad;
      this.imagenes = this.datosActividad.imagenes;
      this.cantNiveles = this.imagenes.length;
      this.randomImg();
      this.evaluarTarea();
    }
  }

  evaluarTarea() {
    if (this.datosActividad.tarea == true) {
      this.tarea = this.datosActividad.datosTarea;
    }
  }

  randomImg() {
    for (let i = this.imagenes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i)
      const temp = this.imagenes[i]
      this.imagenes[i] = this.imagenes[j]
      this.imagenes[j] = temp;
    }
  }

  actividad(imagen: Imagen) {
    this.playAudio(imagen.urlAudio);
  }

  playAudio(audioURL) {
    M.Toast.dismissAll();
    M.toast({ html: 'Reproduciendo audio...', classes: 'orange darken-3 rounded' })
    let audio = new Audio();
    audio.src = audioURL;
    audio.load();
    audio.play();
    this.audioPlayed = true;
  }

  avanzar() {
    this.mensajeInfo = "<p> <b>¡Muy buen trabajo!</b> </p> Avancemos ahora a la siguiente lámina.";
    M.Toast.dismissAll();
    this.audioPlayed = false;
    this.numImagen++;
    (this.numImagen == this.imagenes.length) ? this.finalActividad() : this.ventanaInfo();
  }

  ventanaInfo() {

    const dialogRef = this.dialog.open(VentanaInfoComponent, {
      maxWidth: '400px',
      data: { mensaje: this.mensajeInfo, tipo: 'info' },
      autoFocus: false,
      maxHeight: '90vh',
    });

    dialogRef.afterClosed().subscribe(res => {

      (this.hayRegistro) ? this.regresar() : res;

    });
  }

  finalActividad() {
    this.mensajeInfo = '<b>Fin de la actividad</b> <p>Verifica los datos antes de guardar el registro de la actividad realizada.</p>';
    this.finActividad = true;
    this.pauseTimer();
    this.duracionActividad = this.time;
    this.ventanaInfo();
    this.cantErrores = 0;
    this.aprobacion = 1;
  }

  registrarActividad() {

    this.showSpinner();

    if (this.datosActividad.tarea == true) {
      this.registroTarea();
    }

    this.observacionFinal = this.observacionForm.value;

    const registro = {
      _id: '',
      paciente: this.idPaciente,
      actividad: this.idActividad,
      fecha_actividad: this.fechaActividad,
      duracion_actividad: this.duracionActividad,
      imagenes_actividad: this.imagenes,
      imagenes_errores: this.imagenesErrores,
      cant_niveles: this.cantNiveles,
      cant_errores: this.cantErrores,
      aprobacion: this.aprobacion,
      observacion_final: this.observacionFinal
    }

    this.registroActividad = registro;

    this.registroService.postRegistroActividad(this.registroActividad)
      .subscribe(res => {
        if (this.datosActividad.tarea == true) {
          this.hayRegistroAct = true;
          this.evaluarRegistros();
        } else {
          this.hayRegistro = true;
          this.mensajeInfo = 'Se ha registrado la actividad exitosamente.'
          this.ventanaInfo();
          this.hideSpinner();
        }
      },
        err => {
          console.log(err);
        }
      );
  }

  // Registro de la tarea pendiente ya realizada
  registroTarea() {
    this.tarea.fecha_realizada = this.fechaActividad;
    this.tarea.realizada = true;

    const tarea: Tarea = this.tarea;

    this.tareaService.putTarea(tarea).subscribe(res => {
      this.hayRegistroTarea = true;
      this.evaluarRegistros();
    },
      err => {
        console.log(err);
      });
  }

  // Se evaluan ambos registros
  evaluarRegistros() {

    if (this.hayRegistroAct && this.hayRegistroTarea) {
      this.hayRegistro = true;
      this.mensajeInfo = 'Se ha registrado la actividad exitosamente.'
      this.ventanaInfo();
      this.hideSpinner();
    }

  }

  regresar() {
    this.router.navigate(['../actividades']);
  }

}
