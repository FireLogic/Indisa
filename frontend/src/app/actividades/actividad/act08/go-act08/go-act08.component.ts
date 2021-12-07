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
  selector: 'app-go-act08',
  templateUrl: './go-act08.component.html',
  styleUrls: ['./go-act08.component.css']
})
export class GoAct08Component implements OnInit {

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

  cardsImg;
  imagen;

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

  loadImgs(imagenes) {

    this.cardsImg = [];

    imagenes.forEach((imagen: Imagen) => {
      let objImg = {
        id: imagen._id,
        nombre: imagen.nombre,
        categoria: imagen.categoria,
        subcategoria: imagen.subcategoria,
        urlImg: imagen.urlImg,
        flag: false,
        color: imagen.color
      };
      this.cardsImg.push(objImg);
    });
    this.loadCards();
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

  sortImgByCat(imagenes) {
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
    return imagenes.sort(compare);
  }


  twoDifCards(card) {
    let twoCards = [];
    let cont = 0;
    let contImg = 0;
    // Cards de la misma subcategoria.
    this.cardsImg.forEach(img => {
      contImg++;
      if (card.subcategoria == img.subcategoria && card.id != img.id) {
        cont++;
        (cont < 3) ? twoCards.push(img) : twoCards;
      }
    });
    // Cards de la misma categoria (solo si hace falta)
    if (contImg == this.cardsImg.length && twoCards.length != 2) {
      cont = twoCards.length;
      this.cardsImg.forEach(img => {
        if (card.categoria == img.categoria && card.id != img.id) {
          if (twoCards.length == 1 && twoCards[0].id == img.id) {
            /* card repetida */
          } else {
            cont++;
            (cont < 3) ? twoCards.push(img) : twoCards;
          }
        }
      });
    }
    return twoCards;
  }

  loadCards() {
    let cards = [];
    let twoCards = [];
    let cardImg;

    this.cardsImg = this.randomCards(this.cardsImg);

    this.cardsImg.forEach(card => {
      if (card.flag == false) {
        cardImg = card;
      }
    });

    this.imagen = cardImg;
    cards.push(this.imagen);
    twoCards = this.twoDifCards(this.imagen);
    cards = cards.concat(twoCards);
    this.cards = this.randomCards(cards);
    this.cards = this.randomCards(cards);
  }

  selectCard(card) {
    if (card.id == this.imagen.id) {
      this.cardsImg.forEach(img => {
        if (card.id == img.id) {
          img.flag = true;
        }
      });
      this.avanzar();
    } else {
      this.imagenes_original.forEach((imagen: Imagen) => {
        if (imagen._id == this.imagen.id) {
          this.imagenesErrores.push(imagen);
        }
      });
      this.cantErrores++;
      M.toast({ html: 'Respuesta incorrecta...', classes: 'red rounded' })
    }
  }

  avanzar() {
    this.mensajeInfo = "<p> <b>¡Muy buen trabajo!</b> </p> Avancemos ahora a la siguiente lámina.";
    M.Toast.dismissAll();
    this.numImagen++;
    (this.numImagen == this.imagenes.length) ? this.finalActividad() : this.seguir();
  }

  seguir() {
    this.loadCards();
    this.ventanaInfo();
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
