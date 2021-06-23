import { Component, OnInit } from '@angular/core';
import { Actividad } from 'src/app/models/actividad';
import { Paciente } from 'src/app/models/paciente';
import { Imagen } from 'src/app/models/imagen';
import { Categoria } from 'src/app/models/categoria';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ImagenService } from 'src/app/shared/services/imagen.service';
import { CategoriaService } from 'src/app/shared/services/categoria.service';
import { PacienteService } from 'src/app/shared/services/paciente.service';
import { ActividadService } from 'src/app/shared/services/actividad.service';
import { DataService } from 'src/app/shared/services/data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { VentanaInfoComponent } from 'src/app/shared/ventana-info/ventana-info.component';
import { TareaService } from 'src/app/shared/services/tarea.service';
import { Usuario } from 'src/app/models/usuario';
import { Tarea } from 'src/app/models/tarea';

@Component({
  selector: 'app-act07',
  templateUrl: './act07.component.html',
  styleUrls: ['./act07.component.css']
})
export class Act07Component implements OnInit {

  idPaciente: string;
  idActividad = '5ed948ff242c18b9df8e8657';
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
  hayMismasSubCat: boolean = false;
  mensaje;
  tipoMensaje;
  permisoActividad: boolean = false;
  imagenesGo = [];
  imgDif = [];
  contImg = 0;

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
          if (imagen.categoria == cat.nombre) {
            filtroImg.push(imagen);
          }
        });
      }
      else if (!this.subcatSelected && this.actividadGroup.value.categoriasForm.length == 0) {
        filtroImg = this.imagenes;
      }
      else if (this.subcatSelected && this.subcatSelected.length == 0) {
        this.actividadGroup.value.categoriasForm.forEach(cat => {
          if (imagen.categoria == cat.nombre) {
            filtroImg.push(imagen);
          }
        });
      }
      else if (this.subcatSelected && this.subcatSelected.length > 0) {
        this.subcatSelected.forEach(subcat => {
          if (imagen.subcategoria == subcat) {
            filtroImg.push(imagen);
          }
        });
      }
    });
    this.imagenesList = filtroImg;
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

  sortImgBySubcat(imagenes) {
    function compare(a, b) {
      // Use toUpperCase() to ignore character casing
      const bandA = a.subcategoria.toUpperCase();
      const bandB = b.subcategoria.toUpperCase();
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

  oneDif(arrImg, imagenes) {
    const cat = arrImg[0].categoria;
    const subcat = arrImg[0].subcategoria;
    let cont = 0;
    let oneImg;

    if (this.imgDif.length > 0) {
      imagenes.forEach(img => {
        this.imgDif.forEach(dif => {
          if (cont < 1 && cat == img.categoria && subcat != img.subcategoria
            && dif._id != img._id && !this.imgDif.includes(img)) {
            cont++;
            oneImg = img;
            this.imgDif.push(img);
          }
        });
      });
    } else {
      imagenes.forEach(img => {
        if (cont < 1 && cat == img.categoria && subcat != img.subcategoria) {
          cont++;
          oneImg = img;
          this.imgDif.push(img);
        }
      });
    }

    return oneImg;
  }


  validarSubCat(imagenes) {

    this.imgDif = [];
    this.hayMismasSubCat = false;

    const imgSorted = this.sortImgBySubcat(imagenes);
    const subcats = imgSorted.map(a => a.subcategoria);
    let cont = -1;
    let contTrue = 0;
    let posI = [];
    let posF = [];

    subcats.forEach(subcat => {
      cont++;
      if ((cont + 1) <= subcats.length) {
        if (contTrue < 2 && subcats[cont] == subcats[cont + 1]) {
          contTrue++;
          posI.push(cont);
        }
        else if (contTrue == 2 && subcats[cont] == subcats[cont - 1]) {
          posI.push(cont);
          let arrImg = []
          let oneDif;
          arrImg.push(imgSorted[posI[0]]);
          arrImg.push(imgSorted[posI[1]]);
          arrImg.push(imgSorted[posI[2]]);
          oneDif = this.oneDif(arrImg, imagenes);
          if (oneDif) {
            arrImg.push(oneDif);
            this.hayMismasSubCat = true;
            arrImg.forEach(img => {
              posF.push(img);
            });
          }
          contTrue = 0;
          posI = [];
        }
        else {
          contTrue = 0;
          posI = [];
        }
      }
    });

    return posF;
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

    this.imagenesGo = this.validarSubCat(this.imgSelected);
    this.cantImg = this.imagenesGo.length;

  }

  goActividad() {

    this.evaluarImgs();

    // Se valida si se cargaron como mínimo 3 imágenes de la misma subcategoría.
    if (this.imagenesGo.length >= 4 && this.hayMismasSubCat) {

      this.mensaje = 'Se utilizarán ' + this.cantImg + ' imágenes para esta actividad.';
      this.permisoActividad = true;
      this.tipoMensaje = 'info2';
      this.ventanaInfo();

      const datosActividad = {
        idPaciente: this.idPaciente,
        idActividad: this.idActividad,
        imagenes: this.imagenesGo,
        tarea: false
      }

      this.dataService.changeMessage(datosActividad);
    }
    else {
      this.mensaje = 'Esta actividad requiere al menos 4 imágenes, donde <b>3 deben ser de la misma subcategoría</b> para poder comenzar.'
      this.permisoActividad = false;
      this.tipoMensaje = 'info'
      this.ventanaInfo();
    }

  }

  enviarTarea() {

    this.evaluarImgs();

    // Se valida si se cargaron como mínimo 3 imágenes de la misma subcategoría.
    if (this.imagenesGo.length >= 4 && this.hayMismasSubCat) {

      this.mensaje = 'Se enviarán ' + this.cantImg + ' imágenes para esta actividad.';
      this.permisoTarea = true;
      this.tipoMensaje = 'info2';
      this.ventanaInfo();
    }
    else {
      this.mensaje = 'Esta actividad requiere al menos 4 imágenes, donde <b>3 deben ser de la misma subcategoría</b> para poder enviar.'
      this.permisoTarea = false;
      this.tipoMensaje = 'info'
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
        imagenes: this.imagenesGo
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
        this.router.navigate(['/actividades/actividad-07-play'], { skipLocationChange: true });
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