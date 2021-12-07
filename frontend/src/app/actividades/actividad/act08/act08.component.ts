import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ImagenService } from 'src/app/shared/services/imagen.service';
import { Imagen } from 'src/app/models/imagen';
import { PacienteService } from 'src/app/shared/services/paciente.service';
import { Paciente } from 'src/app/models/paciente';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/shared/services/data.service';
import { ActividadService } from 'src/app/shared/services/actividad.service';
import { Actividad } from 'src/app/models/actividad';
import { MatDialog } from '@angular/material';
import { VentanaInfoComponent } from 'src/app/shared/ventana-info/ventana-info.component';
import { CategoriaService } from 'src/app/shared/services/categoria.service';
import { Categoria } from 'src/app/models/categoria';
import { TareaService } from 'src/app/shared/services/tarea.service';
import { Usuario } from 'src/app/models/usuario';
import { Tarea } from 'src/app/models/tarea';

@Component({
  selector: 'app-act08',
  templateUrl: './act08.component.html',
  styleUrls: ['./act08.component.css']
})
export class Act08Component implements OnInit {

  idPaciente: string;
  idActividad = '61539a3e23ef6447e00ee097';
  actividad: Actividad;
  pacientes: Paciente[];
  imagenes: Imagen[];
  categorias = [];
  categoriasTotal: Categoria[];
  imagenesList;
  subcategorias;
  catSelected;
  subcatSelected;
  imgSelected;
  cantImg;
  hayActividad: boolean = false;
  hayPacientes: boolean = false;
  hayImagenes: boolean = false;
  hayCategorias: boolean = false;
  mensaje;
  tipoMensaje;
  permisoActividad: boolean = false;
  permisoTarea: boolean = false;
  tareaEnviada: boolean = false;


  actividadGroup = new FormGroup({
    pacienteForm: new FormControl('', [Validators.required]),
    categoriasForm: new FormControl(''),
    subcategoriasForm: new FormControl(''),
    imagenesForm: new FormControl('')
  })

  constructor(private readonly imagenService: ImagenService,
    private readonly categoriaService: CategoriaService,
    private readonly pacienteService: PacienteService,
    private readonly actividadService: ActividadService,
    private readonly dataService: DataService,
    private readonly tareaService: TareaService,
    private spinner: NgxSpinnerService,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getPacientes();
    this.getImagenes();
    this.getActividad();
    this.getCategorias();
  }

  showSpinner() {
    this.spinner.show();
  }
  hideSpinner() {
    this.spinner.hide();
  }

  datosComponent() {
    if (this.hayActividad && this.hayImagenes && this.hayPacientes) {
      this.categoriasDisponibles();
      this.hideSpinner();
    }
  }

  getActividad() {
    this.showSpinner();
    this.actividadService.getActividad(this.idActividad)
      .subscribe(res => {
        this.actividadService.actividad = res as Actividad;
        this.actividad = this.actividadService.actividad;
        this.hayActividad = true;
        this.datosComponent();
      });
  }

  getPacientes() {
    this.showSpinner();
    this.pacienteService.getPacientes()
      .subscribe(res => {
        this.pacienteService.pacientes = res as Paciente[];
        this.pacientes = this.pacienteService.pacientes;
        this.hayPacientes = true;
        this.datosComponent();
      });
  }

  getImagenes() {
    this.showSpinner();
    this.imagenService.getImagenes()
      .subscribe(res => {
        this.imagenService.imagenes = res as Imagen[];
        this.imagenes = this.imagenService.imagenes;
        this.hayImagenes = true;
        this.datosComponent();
      });
  }

  getCategorias() {
    this.showSpinner();
    this.categoriaService.getCategorias()
      .subscribe(res => {
        this.categoriaService.categorias = res as Categoria[];
        this.categoriasTotal = this.categoriaService.categorias;
        this.hayCategorias = true;
        this.datosComponent();
      });
  }

  categoriasDisponibles() {
    if (this.categoriasTotal && this.imagenes) {
      this.imagenes.forEach(imagen => {
        this.categoriasTotal.forEach(categoria => {
          if (imagen.categoria == categoria.nombre) {
            this.categorias.push(categoria);
          }
        });
      });
      this.categorias = Array.from(new Set(this.categorias));
    }
  }

  subcategoriasDisponibles(subcategorias) {
    let sc = [];
    this.imagenes.forEach(imagen => {
      subcategorias.forEach(subcat => {
        if (imagen.subcategoria == subcat) {
          sc.push(subcat);
        }
      });
    });
    sc = Array.from(new Set(sc));
    return sc;
  }

  filtroCategorias() {
    let subcategorias = [];
    if (this.actividadGroup.value.categoriasForm && this.actividadGroup.value.categoriasForm.length > 0) {
      this.actividadGroup.value.categoriasForm.forEach(categoria => {
        categoria.subcategorias.forEach(subcategoria => {
          subcategorias.push(subcategoria);
        });
      });
      this.filtrarImagenes();
      this.subcategorias = this.subcategoriasDisponibles(subcategorias);
    }
  }

  filtroSubcategorias() {
    this.subcatSelected = this.actividadGroup.value.subcategoriasForm;
    this.filtrarImagenes();
  }

  filtrarImagenes() {
    this.imgSelected = '';
    let filtroImg = [];
    
    this.imagenes.forEach(imagen => {
      if (!this.subcatSelected && this.actividadGroup.value.categoriasForm.length > 0) {
        this.actividadGroup.value.categoriasForm.forEach(cat => {
          // FILTRO DE QUE LAS IMAGENES TENGAN COLOR
          if ((imagen.categoria == cat.nombre) && (imagen.color != null)) {
            filtroImg.push(imagen);
          }
        });
      }
      else if (!this.subcatSelected && this.actividadGroup.value.categoriasForm.length == 0) {
        filtroImg = this.imagenes;
      }
      else if (this.subcatSelected && this.subcatSelected.length == 0) {
        this.actividadGroup.value.categoriasForm.forEach(cat => {
          // FILTRO DE QUE LAS IMAGENES TENGAN COLOR
          if ((imagen.categoria == cat.nombre) && (imagen.color != null)) {
            filtroImg.push(imagen);
          }
        });
      }
      else if (this.subcatSelected && this.subcatSelected.length > 0) {
        this.subcatSelected.forEach(subcat => {
          // FILTRO DE QUE LAS IMAGENES TENGAN COLOR
          if ((imagen.subcategoria == subcat) && (imagen.color != null)) {
            filtroImg.push(imagen);
          }
        });
      }
    });
    this.imagenesList = filtroImg;
  }

  evaluarImgs() {

    this.idPaciente = this.actividadGroup.value.pacienteForm;
    this.imgSelected = this.actividadGroup.value.imagenesForm;
    this.catSelected = this.actividadGroup.value.categoriasForm;

    // Se determinan las imágenes a incluir en la actividad
    if (this.imgSelected && this.imgSelected.length > 0) {
      this.imgSelected = this.actividadGroup.value.imagenesForm;
    }
    else if (this.catSelected && this.catSelected.length == 0 && this.subcatSelected && this.subcatSelected.length > 0) {
      this.filtroSubcategorias();
      this.imgSelected = this.imagenesList;
    }
    else if (this.catSelected && this.catSelected.length > 0) {
      this.filtrarImagenes();
      this.imgSelected = this.imagenesList;
    }
    else {
      this.imgSelected = this.imagenes;
    }

    this.cantImg = this.imgSelected.length;

  }

  goActividad() {

    this.evaluarImgs();

    if (this.imgSelected.length < 3) {

      this.mensaje = 'Esta actividad <b> requiere un mínimo de 3 imágenes </b> para comenzar.'
      this.permisoActividad = false;
      this.tipoMensaje = 'info'
      this.ventanaInfo();


    } else {

      this.mensaje = 'Se utilizarán ' + this.cantImg + ' imágenes para esta actividad.';
      this.permisoActividad = true;
      this.tipoMensaje = 'info2';
      this.ventanaInfo();

      const datosActividad = {
        idPaciente: this.idPaciente,
        idActividad: this.idActividad,
        imagenes: this.imgSelected,
        tarea: false
      }

      this.dataService.changeMessage(datosActividad);
    }

  }

  enviarTarea() {

    this.evaluarImgs();


    if (this.imgSelected.length < 3) {

      this.mensaje = 'Esta actividad <b> requiere un mínimo de 3 imágenes </b> para enviar.'
      this.permisoTarea = false;
      this.tipoMensaje = 'info'
      this.ventanaInfo();

    }
    else if (this.imgSelected.length > 0) {

      this.mensaje = 'Se enviarán ' + this.imgSelected.length + ' imágenes para esta actividad.';
      this.permisoTarea = true;
      this.tipoMensaje = 'info2';
      this.ventanaInfo();
    }

  }

  enviarTareaActividad() {

    this.showSpinner();

    const user: Usuario = JSON.parse(localStorage.getItem('perfil'));

    const tarea: Tarea = {
      _id: '',
      emisor: user._id,
      receptor: this.idPaciente,
      fecha_envio: new Date(),
      fecha_realizada: undefined,
      actividad: {
        idActividad: this.idActividad,
        imagenes: this.imgSelected
      },
      realizada: false
    };

    this.tareaService.postTarea(tarea)
      .subscribe(res => {
        this.mensaje = 'La actividad ha sido enviada como tarea al paciente satisfactoriamente';
        this.permisoTarea = false;
        this.tipoMensaje = 'info';
        this.tareaEnviada = true;
        this.hideSpinner();
        this.ventanaInfo();
      },
        err => {
          this.mensaje = 'Error al intentar enviar tarea al paciente.';
          this.permisoTarea = false;
          this.tipoMensaje = 'info';
          this.hideSpinner();
          this.ventanaInfo();
        });
  }

  ventanaInfo() {

    const dialogRef = this.dialog.open(VentanaInfoComponent, {
      maxWidth: '400px',
      data: { mensaje: this.mensaje, tipo: this.tipoMensaje },
      autoFocus: false,
      maxHeight: '90vh',
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res == true && this.permisoActividad) {
        this.router.navigate(['/actividades/actividad-08-play'], { skipLocationChange: true });
      }
      else if (res == true && !this.permisoActividad && this.permisoTarea) {
        this.enviarTareaActividad();
      }
      else if (!this.permisoActividad && !this.permisoTarea && this.tareaEnviada) {
        this.router.navigate(['/actividades']);
      }
      else if (!this.permisoActividad && !this.permisoTarea) {
        /* Permiso denegado */
      }
      else {
        this.permisoActividad = false;
        this.permisoTarea = false;

      }

    });

  }

  regresar() {
    this.router.navigate(['../actividades']);
  }
}