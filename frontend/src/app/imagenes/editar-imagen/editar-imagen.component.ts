import { Component, OnInit, Inject } from '@angular/core';
import { ImagenService } from 'src/app/shared/services/imagen.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Imagen } from 'src/app/models/imagen';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from 'src/app/shared/services/categoria.service';
import { Categoria } from 'src/app/models/categoria';
import { CrearCategoriaComponent } from 'src/app/ajustes/categorias/crear-categoria/crear-categoria.component';

import { VerboService } from 'src/app/shared/services/verbo.service';
import { Verbo } from 'src/app/models/verbo';
import { CrearVerboComponent } from 'src/app/ajustes/verbos/crear-verbo/crear-verbo.component';

declare var M: any;

@Component({
  selector: 'app-editar-imagen',
  templateUrl: './editar-imagen.component.html',
  styleUrls: ['./editar-imagen.component.css']
})
export class EditarImagenComponent implements OnInit {

  imagen: Imagen;
  categorias: Categoria[];
  subcategorias;
  verbos : Verbo[];

  filePathImg; fileImg; fileNameImg; urlImg;
  filePathAudio; fileAudio; fileNameAudio; urlAudio;
  dirImagenes = 'actividades/imagenes/';
  dirAudios = 'actividades/audios/';

  hayImagen = false;
  hayCategorias = false;
  hayVerbos = false;


  fonemas = [
    {
      nombre: 'Contacto labial',
      sonidos: ['M', 'P', 'B']
    },
    {
      nombre: 'Alveolares',
      sonidos: ['N', 'T', 'D']
    },
    {
      nombre: 'Labio dental',
      sonidos: ['F']
    },
    {
      nombre: 'Labio post dental',
      sonidos: ['S']
    },
    {
      nombre: 'Líquidas',
      sonidos: ['L', 'R', 'RR']
    },
    {
      nombre: 'Palatales',
      sonidos: ['CH', 'LL', 'Ñ']
    },
    {
      nombre: 'Velares',
      sonidos: ['J', 'K', 'G']
    }
  ];

  difonos = [
    {
      nombre: 'Consonánticos',
      valores: ['pl', 'bl', 'fl', 'cl', 'gl', 'pr', 'br', 'fr', 'cr', 'gr', 'tr', 'dr']
    },
    {
      nombre: 'Vocálicos',
      valores: ['au', 'ai', 'ei', 'eu', 'ia', 'ie', 'io', 'iu', 'oi', 'ua', 'ue', 'ui']
    }
  ];

  imagenGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    silabas: new FormControl('', [Validators.required]),
    categoria: new FormControl('', [Validators.required]),
    subcategoria: new FormControl('', [Validators.required]),
    fonema: new FormControl(''),
    difono: new FormControl(''),
    urlImg: new FormControl(''),
    urlAudio: new FormControl(''),
    definicion: new FormControl('', [Validators.required]),
    verbo: new FormControl(''),
    color : new FormControl('')
  })

  constructor(private readonly imagenService: ImagenService,
    private readonly categoriaService: CategoriaService,
    private readonly verboService: VerboService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EditarImagenComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit() {
    this.imagen = new Imagen();
    this.getImagen(this.data)
    this.getCategorias();
    this.getVerbos();
  }

  showSpinner() {
    this.spinner.show();
  }

  hideSpinner() {
    this.spinner.hide();
  }

  onNoClick(): void {
    M.Toast.dismissAll();
    this.dialogRef.close();
  }

  cargarSubcategorias() {
    if (this.hayImagen && this.hayCategorias) {
      let categoria;
      this.categorias.forEach(cat => {
        if (cat.nombre == this.imagen.categoria) {
          categoria = cat
        }
      });
      this.getCategoria(categoria);
    }
  }

  getImagen(idImagen: string) {
    this.imagenService.getImagen(idImagen)
      .subscribe(res => {
        this.imagenService.imagen = res as Imagen;
        this.imagen = this.imagenService.imagen;
        this.hayImagen = true;
        this.cargarSubcategorias();
      });
  }

  getCategorias() {
    this.categoriaService.getCategorias()
      .subscribe(res => {
        this.categoriaService.categorias = res as Categoria[];
        this.categorias = this.categoriaService.categorias;
        this.hayCategorias = true;
        this.cargarSubcategorias();
      });
  }

  getVerbos() {
    this.verboService.getVerbos()
      .subscribe(res => {
        this.verboService.verbos = res as Verbo[];
        this.verbos = this.verboService.verbos;
        this.hayVerbos = true;
      });
  }

  getCategoria(categoria) {
    this.subcategorias = categoria.subcategorias;
    if (this.subcategorias.includes(this.imagenGroup.value.subcategoria)) {
      return true;
    } else {
      this.imagenGroup.value.subcategoria = undefined;
    }
  }

  playAudio() {
    M.Toast.dismissAll();
    M.toast({ html: 'Reproduciendo audio...', classes: 'rounded' })
    let audio = new Audio();
    audio.src = this.imagen.urlAudio;
    audio.load();
    audio.play();
  }

  uploadImagen(event) {
    this.fileImg = event.target.files[0];
    this.fileNameImg = Math.random().toString(36).substring(2);
    this.filePathImg = this.dirImagenes + this.fileNameImg;
  }

  uploadAudio(event) {
    this.fileAudio = event.target.files[0];
    this.fileNameAudio = Math.random().toString(36).substring(2);
    this.filePathAudio = this.dirAudios + this.fileNameAudio;
  }

  updateImagen() {

    this.showSpinner();

    let imagen: Imagen = this.imagenGroup.value;

    imagen._id = this.data;

    imagen.urlImg = this.imagen.urlImg;

    imagen.urlAudio = this.imagen.urlAudio;

    const res = {
      fileImg: this.fileImg,
      fileNameImg: this.fileNameImg,
      filePathImg: this.filePathImg,
      fileAudio: this.fileAudio,
      fileNameAudio: this.fileNameAudio,
      filePathAudio: this.filePathAudio,
      imagen: imagen
    }

    this.dialogRef.close(res);

  }

  addCategoria() {

    const dialogRef = this.dialog.open(CrearCategoriaComponent, {
      width: '500px',
      data: '',
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.categoriaService.postCategoria(res)
          .subscribe(res => {
            this.hideSpinner();
            M.toast({ html: 'Categoría registrada exitosamente!' })
            this.getCategorias();
          })
      }
    });

  }

  addVerbo() {

    const dialogRef = this.dialog.open(CrearVerboComponent, {
      width: '500px',
      data: '',
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.verboService.postVerbo(res)
          .subscribe(res => {
            this.hideSpinner();
            M.toast({ html: 'Verbo registrado exitosamente!' })
            this.getVerbos();
          })
      }
    });

  }

}
