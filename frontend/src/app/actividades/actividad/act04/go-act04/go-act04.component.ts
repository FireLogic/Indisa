import { Component, OnInit } from '@angular/core';
import { RegistroActividad } from 'src/app/models/registro_actividad';
import { FormControl } from '@angular/forms';
import { DataService } from 'src/app/shared/services/data.service';
import { RegistroActividadService } from 'src/app/shared/services/registro-actividad.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { VentanaInfoComponent } from 'src/app/shared/ventana-info/ventana-info.component';
import { Imagen } from 'src/app/models/imagen';
import { Tarea } from 'src/app/models/tarea';
import { TareaService } from 'src/app/shared/services/tarea.service';

declare var M: any;

@Component({
  selector: 'app-go-act04',
  templateUrl: './go-act04.component.html',
  styleUrls: ['./go-act04.component.css']
})
export class GoAct04Component implements OnInit {

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
  cantCorrectas: number = 0;
  cantErrores: number = 0;
  cantRondas: number = 0;
  aprobacion: number;
  observacionFinal: string;
  numImagen: number = 0;
  finActividad: boolean;
  hayRegistro: boolean;

  observacionForm = new FormControl('');

  mensajeInfo: string;

  imgSelected;
  cardSelected;

  imgSelected2;
  imgSelected3;
  cardSelected2;
  cardSelected3;

  elemSelected = [];

  cardsImg;
  cards;
  prevPos;

  card1: Imagen;
  card2: Imagen;
  pointsGame: number = 0;

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
    this.finActividad = false;
    this.startTimer();
    this.hayRegistro = false;

    window.onbeforeunload = function () {
      return 'Are you really want to perform the action?';
    }
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
      this.imagenes_original = this.datosActividad.imagenes;
      this.cantNiveles = this.imagenes.length;
      this.sortImg(this.imagenes);
      this.loadCards();
      this.evaluarTarea();
    }
  }

  evaluarTarea() {
    if (this.datosActividad.tarea == true) {
      this.tarea = this.datosActividad.datosTarea;
    }
  }

  sortImg(imagenes) {
    function compare(a, b) {
      // Use toUpperCase() to ignore character casing
      const bandA = a.categoria.toUpperCase();
      const bandB = b.categoria.toUpperCase();
      let comparison = 0;
      if (bandA > bandB) {
        comparison = 1;
      } else if (bandA < bandB) {
        comparison = -1;
      }
      return comparison;
    }
    imagenes.sort(compare);
  }

  randomImg(imagenes) {
    for (let i = imagenes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i)
      const temp = imagenes[i]
      imagenes[i] = imagenes[j]
      imagenes[j] = temp;
    }
    return imagenes;
  }

  loadCards() {
    this.cantRondas++;
    let cardsImg = [];
    let cards = [];
    let cont = -1;

    this.imagenes.forEach((imagen: Imagen) => {
      cont++;
      if (cont < 3) {
        cardsImg.push(imagen);
      }
      if (cont < 6) {
        cards.push(imagen);
      }
    });

    if (cards.length < 6) {
      this.imagenes_original.forEach(imagen => {
        if (cards.length < 6) {
          cards.push(imagen);
        } else {
          return cards;
        }
      });

    }

    this.cards = this.randomImg(cards);
    this.cardsImg = this.randomImg(cardsImg);
    this.imagenes = this.imagenes.slice(3, this.imagenes.length)
  }

  selectCardImg(card: Imagen) {
    if (card) {
      if (this.imgSelected) {
        this.imgSelected.style.opacity = '1';
        this.imgSelected = undefined;
      }
      if (this.elemSelected.includes(card)) {
        /* Card used */
      } else {
        this.imgSelected = document.getElementById(card._id);
        this.imgSelected.style.opacity = '0.15';
        this.card1 = card;
        this.compareCards();
      }
    }
  }

  selectCard(card: Imagen) {
    if (card) {
      if (this.cardSelected) {
        this.cardSelected.style.backgroundColor = 'white';
        this.cardSelected = undefined;
      }
      if (this.elemSelected.includes(card)) {
        /* Card used */
      } else {
        this.cardSelected = document.getElementById(card.nombre);
        this.cardSelected.style.backgroundColor = "lightgray"
        this.card2 = card;
        this.compareCards();
      }
    }
  }

  compareCards() {
    if (this.card1 && this.card2) {
      if (this.card1.nombre == this.card2.nombre) {
        this.pointsGame++;
        this.cantCorrectas++;
        this.cardSelected.style.backgroundColor = "#00e676"
        this.elemSelected.push(this.card1);
        (this.imgSelected2) ? this.imgSelected3 = this.imgSelected : this.imgSelected2 = this.imgSelected;
        (this.cardSelected2) ? this.cardSelected3 = this.cardSelected : this.cardSelected2 = this.cardSelected;
        this.card1 = undefined;
        this.card2 = undefined;
        this.cardSelected = undefined;
        this.imgSelected = undefined;
        M.Toast.dismissAll();
        M.toast({ html: '¡Respuesta correcta!', classes: 'green rounded' });
        if (this.pointsGame == 3) {
          this.pointsGame = 0;
          this.avanzar();
        }
      } else {
        this.cardSelected.style.backgroundColor = 'white';
        this.imgSelected.style.opacity = '1';
        this.imagenesErrores.push(this.card1)
        this.card1 = undefined;
        this.card2 = undefined;
        this.cardSelected = undefined;
        this.imgSelected = undefined;
        this.cantErrores++;
        M.Toast.dismissAll();
        M.toast({ html: 'Respuesta incorrecta...', classes: 'red rounded' });
      }
    }
  }

  cleanCards(cards) {
    if (cards) {
      cards.forEach(card => {
        let cs = document.getElementById(card.nombre);
        if (cs) {
          cs.style.backgroundColor = "white";
        }
      });
    }
  }

  avanzar() {
    this.mensajeInfo = "<p> <b>¡Muy buen trabajo!</b> </p> Avancemos ahora a la siguiente ronda.";
    M.Toast.dismissAll();
    this.numImagen = this.numImagen + 3;
    if (this.numImagen <= (this.imagenes_original.length - 3)) {
      this.seguir();
    }
    else if (this.numImagen > (this.imagenes_original.length - 3)) {
      this.finalActividad();
    }
  }

  seguir() {
    this.ventanaInfo();
    this.loadCards();
    this.cleanCards(this.elemSelected);
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
    this.cantNiveles = this.cantCorrectas;
    this.aprobacion = ((this.cantCorrectas - this.cantErrores) / this.cantNiveles);
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
      imagenes_actividad: this.imagenes_original,
      imagenes_errores: this.imagenesErrores,
      cant_niveles: this.cantNiveles,
      cant_errores: this.cantErrores,
      aprobacion: this.aprobacion,
      observacion_final: this.observacionFinal
    }

    this.registroActividad = registro;

    console.log(this.registroActividad);

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
