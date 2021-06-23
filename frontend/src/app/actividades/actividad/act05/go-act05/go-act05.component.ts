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
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Tarea } from 'src/app/models/tarea';
import { TareaService } from 'src/app/shared/services/tarea.service';

declare var M: any;
@Component({
  selector: 'app-go-act05',
  templateUrl: './go-act05.component.html',
  styleUrls: ['./go-act05.component.css'],
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(179deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])
  ]
})
export class GoAct05Component implements OnInit {
  idPaciente: string;
  idActividad: string;
  registroActividad: RegistroActividad;
  datosActividad: any;
  imagenes;
  imagenes_original = [];
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
  faseFinal: boolean = false;

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

  card1;
  card2;
  pointsGame: number = 0;

  time: number = 0;
  display;
  interval;

  hayCard1: boolean = false;
  hayCard2: boolean = false;

  intentos: number = 0;

  tablero = [
    { name: 'card1', 'state': 'inactive', 'flag': false },
    { name: 'card2', 'state': 'inactive', 'flag': false },
    { name: 'card3', 'state': 'inactive', 'flag': false },
    { name: 'card4', 'state': 'inactive', 'flag': false },
    { name: 'card5', 'state': 'inactive', 'flag': false },
    { name: 'card6', 'state': 'inactive', 'flag': false },
    { name: 'card7', 'state': 'inactive', 'flag': false },
    { name: 'card7', 'state': 'inactive', 'flag': false },
    { name: 'card9', 'state': 'inactive', 'flag': false },
    { name: 'card10', 'state': 'inactive', 'flag': false },
    { name: 'card11', 'state': 'inactive', 'flag': false },
    { name: 'card12', 'state': 'inactive', 'flag': false },
    { name: 'card13', 'state': 'inactive', 'flag': false },
    { name: 'card14', 'state': 'inactive', 'flag': false },
    { name: 'card15', 'state': 'inactive', 'flag': false },
    { name: 'card16', 'state': 'inactive', 'flag': false },
  ];

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
      this.imagenes = this.setImg(this.datosActividad.imagenes);
      this.imagenes_original = this.datosActividad.imagenes;
      this.cantNiveles = this.imagenes.length;
      this.loadCards();
      this.evaluarTarea();
    }
  }

  evaluarTarea() {
    if (this.datosActividad.tarea == true) {
      this.tarea = this.datosActividad.datosTarea;
    }
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

  setImg(imgs) {
    imgs.forEach(img => {
      ((img.nombre).includes('*')) ? img.nombre = (img.nombre).replace('*', '')
        : img.nombre = img.nombre + '*';
    });
    return imgs;
  }

  loadCards() {
    let cont = -1;
    let arreglo1 = [];
    let arreglo2 = [];

    this.imagenes.forEach((imagen: Imagen) => {
      let object = {
        nombre: imagen.nombre,
        urlImg: imagen.urlImg
      }
      arreglo1.push(object);
    });

    this.imagenes.forEach((imagen: Imagen) => {
      let object = {
        nombre: imagen.nombre + '*',
        urlImg: imagen.urlImg
      }
      arreglo2.push(object);
    });

    this.cards = arreglo1.concat(arreglo2);
    this.cards = this.randomImg(this.cards);
    this.tablero.forEach(tCard => {
      cont++
      tCard.name = this.cards[cont].nombre;
    });
  }

  toggleFlip(card) {

    M.Toast.dismissAll();

    this.tablero.forEach(tCard => {
      if (card == tCard.name) {
        if (tCard.state == 'inactive') {
          tCard.state = 'active';
          this.flagCards(card);
        } else {
          return card;
        }
      }
    });
  }

  flagCards(card) {

    if (this.hayCard1 && !this.hayCard2) {
      this.hayCard2 = true;
      this.card2 = card;
    }

    if (!this.hayCard1) {
      this.hayCard1 = true;
      this.card1 = card;
    }

    if (this.hayCard1 && this.hayCard2) {
      this.compareCards(this.card1, this.card2);
    }

  }

  compareCards(card1, card2) {

    // Promesa que retorna 'inactive' después de 1 segundo.
    function Inactive() {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve('inactive');
        }, 1000);
      });
    }
    // Llamada asíncrona para cambiar el estado de la tarjeta (flipcard).
    async function state() {
      const inactive = await Inactive();
      return inactive;
    }

    this.intentos++;
    const c1 = card1;
    const c2 = card2;

    // Se limpian los nombres de las tarjetas para la comparación.
    (card1.includes('**')) ? card1 = card1.replace('**', '') : card1 = card1.replace('*', '');
    (card2.includes('**')) ? card2 = card2.replace('**', '') : card2 = card2.replace('*', '');
    // Comparación de tarjetas (MATCH)
    if (card1 == card2) {
      this.cantCorrectas++;
      M.toast({ html: '¡Respuesta correcta!', classes: 'green rounded' });
      (this.cantCorrectas == this.imagenes_original.length) ? this.mensajeFinal() : this.cantCorrectas;
    } else {
      const stInactive = state();
      card1 = c1;
      card2 = c2;
      // Se cambia flag de tarjeta y callback para cambiar el estado de la tarjeta.
      this.tablero.forEach(card => {
        if (card.name == card1) {
          (card.flag == true) ? this.contErr(card1) : card.flag = true;
          stInactive.then((state: string) => card.state = state);
        }
        if (card.name == card2) {
          stInactive.then((state: string) => card.state = state);
        }
      });
    }
    // Se reestablecen los datos para las tarjetas.
    this.card1 = undefined;
    this.card2 = undefined;
    this.hayCard1 = false;
    this.hayCard2 = false;
  }

  // Conteo de errores y se guarda la imagen del error.
  contErr(card) {
    this.imagenes.forEach((imagen: Imagen) => {
      if (imagen.nombre == card) {
        this.cantErrores++;
        this.imagenesErrores.push(imagen);
      }
    });
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

      (this.faseFinal) ? this.finalActividad() : res;



    });
  }

  calcularAprobacion() {
    this.cantNiveles = this.imagenes_original.length;
    this.aprobacion = ((this.cantCorrectas * 2) - this.cantErrores) / (this.cantNiveles * 2);
    (this.aprobacion < 0) ? this.aprobacion = 0 : this.aprobacion = this.aprobacion;
  }

  mensajeFinal() {
    this.pauseTimer();
    this.faseFinal = true;
    this.mensajeInfo = '<b>¡Felicidades!</b> <p>Completaste satisfactoriamente esta actividad.</p>';
    this.ventanaInfo();
  }

  finalActividad() {
    this.mensajeInfo = '<b>Fin de la actividad</b> <p>Verifica los datos antes de guardar el registro de la actividad realizada.</p>';
    this.finActividad = true;
    this.faseFinal = false;
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

    this.imagenesErrores.forEach(imagen => {
      imagen.nombre = imagen.nombre.replace('*', '');
    });

    this.imagenes_original.forEach(imagen => {
      imagen.nombre = imagen.nombre.replace('*', '');
    });

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