import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { RegistroActividad } from 'src/app/models/registro_actividad';
import { FormControl } from '@angular/forms';
import { DataService } from 'src/app/shared/services/data.service';
import { RegistroActividadService } from 'src/app/shared/services/registro-actividad.service';
import { MatDialog } from '@angular/material';
import { VentanaInfoComponent } from 'src/app/shared/ventana-info/ventana-info.component';
import { Imagen } from 'src/app/models/imagen';
import { Tarea } from 'src/app/models/tarea';
import { TareaService } from 'src/app/shared/services/tarea.service';

declare var M: any;

@Component({
  selector: 'app-go-act07',
  templateUrl: './go-act07.component.html',
  styleUrls: ['./go-act07.component.css']
})
export class GoAct07Component implements OnInit {

  idPaciente: string;
  idActividad: string;
  registroActividad: RegistroActividad;
  datosActividad: any;
  imagenes;
  imagenes_original;
  imagenesErrores = [];
  fechaActividad: Date;
  duracionActividad: number;
  cantNiveles: number;
  cantErrores: number = 0;
  aprobacion: number;
  observacionFinal: string;
  numImagen: number = 0;
  numCards: number = 0;
  finActividad: boolean;
  hayRegistro: boolean;
  faltanCards: boolean = false;
  imagenesAux;
  cantRondas = 0;

  cardsImg;
  imagen;
  imagenDif;

  observacionForm = new FormControl('');

  mensajeInfo: string;

  cards;
  prevPos;

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
      this.imagenes_original = this.datosActividad.imagenes;
      this.imagenes = this.datosActividad.imagenes;
      this.cantNiveles = this.imagenes.length;
      this.loadImgs(this.imagenes);
      this.evaluarTarea();
    }
  }

  evaluarTarea() {
    if (this.datosActividad.tarea == true) {
      this.tarea = this.datosActividad.datosTarea;
    }
  }

  loadImgs(array) {
    let imagenes = [];

    array.forEach(element => {
      imagenes.push(element);
    });

    this.loadCards(imagenes);
  }

  randomCards(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i)
      const temp = cards[i]
      cards[i] = cards[j]
      cards[j] = temp;
    }
    return cards;
  }


  loadCards(imagenes) {
    let cards = [];

    this.imagenesAux = imagenes;

    cards.push(imagenes[0]);
    cards.push(imagenes[1]);
    cards.push(imagenes[2]);
    cards.push(imagenes[3]);
    this.imagen = imagenes[3];

    this.cards = this.randomCards(cards);
    this.cards = this.randomCards(this.cards);
  }

  selectCard(card) {
    if (card._id == this.imagen._id) {
      this.avanzar();
      this.imagenesAux.splice(0, 4);
      this.loadCards(this.imagenesAux);
    } else {
      this.imagenes_original.forEach((imagen: Imagen) => {
        if (imagen._id == this.imagen._id) {
          this.imagenesErrores.push(imagen);
        }
      });
      this.cantErrores++;
      M.toast({ html: 'Respuesta incorrecta...', classes: 'red rounded' })
    }
  }

  avanzar() {
    this.mensajeInfo = "<p> <b>¡Muy buen trabajo!</b> </p> Avancemos ahora a la siguiente ronda.";
    M.Toast.dismissAll();
    this.cantRondas++;
    this.numImagen = this.numImagen + 4;
    (this.numImagen == this.imagenes_original.length) ? this.finalActividad() : this.ventanaInfo();
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

  calcularAprobacion() {
    const cantCorrectas = (this.cantNiveles - this.cantErrores);
    this.aprobacion = (cantCorrectas / this.cantNiveles);
    (this.aprobacion < 0) ? this.aprobacion = 0 : this.aprobacion = this.aprobacion;
  }

  finalActividad() {
    this.mensajeInfo = '<b>Fin de la actividad</b> <p>Verifica los datos antes de guardar el registro de la actividad realizada.</p>';
    this.finActividad = true;
    this.pauseTimer();
    this.duracionActividad = this.time;
    this.ventanaInfo();
    this.calcularAprobacion();
  }

  registrarActividad() {

    this.showSpinner();

    if (this.datosActividad.tarea == true) {
      this.registroTarea();
    }

    this.observacionFinal = this.observacionForm.value;

    this.imagenesErrores = Array.from(new Set(this.imagenesErrores));

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