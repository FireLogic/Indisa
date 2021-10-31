import { Component, OnInit, Input, NgZone, ElementRef, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ImagenService } from 'src/app/shared/services/imagen.service';
import { Router } from '@angular/router';
import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorStateMatcher } from '@angular/material';
import { Imagen } from 'src/app/models/imagen';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/shared/services/categoria.service';
import { CrearCategoriaComponent } from 'src/app/ajustes/categorias/crear-categoria/crear-categoria.component';

import { Verbo } from 'src/app/models/verbo';
import { VerboService } from 'src/app/shared/services/verbo.service';
import { CrearVerboComponent } from 'src/app/ajustes/verbos/crear-verbo/crear-verbo.component';


declare var M: any;

@Component({
  selector: 'app-subir-imagen',
  templateUrl: './subir-imagen.component.html',
  styleUrls: ['./subir-imagen.component.scss']
})
export class SubirImagenComponent implements OnInit {

  imagen: Imagen;
  categorias: Categoria[];
  subcategorias;
  verbos : Verbo[];

  filePathImg; fileImg; fileNameImg; urlImg;
  filePathAudio; fileAudio; fileNameAudio; urlAudio;
  dirImagenes = 'actividades/imagenes/';
  dirAudios = 'actividades/audios/';

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
    silabas: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(10),
    ]),
    categoria: new FormControl('', [Validators.required]),
    verbo: new FormControl('', [Validators.required]),
    subcategoria: new FormControl('', [Validators.required]),
    fonema: new FormControl(''),
    difono: new FormControl(''),
    urlImg: new FormControl('', [Validators.required]),
    urlAudio: new FormControl('', [Validators.required]),
    definicion: new FormControl('', [Validators.required])
  })

  constructor(private readonly categoriasService: CategoriaService,
    private readonly verbosService: VerboService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<SubirImagenComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
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
    this.dialogRef.close();
  }
  
  getVerbos(){
    this.verbosService.getVerbos()
    .subscribe(res => {
      this.verbosService.verbos = res as Verbo[];
      this.verbos = this.verbosService.verbos;
    })
  }


  getCategorias() {
    this.categoriasService.getCategorias()
      .subscribe(res => {
        this.categoriasService.categorias = res as Categoria[];
        this.categorias = this.categoriasService.categorias;
      })
  }

  getCategoria(categoria) {
    this.subcategorias = categoria.subcategorias;
    if (this.subcategorias.includes(this.imagenGroup.value.subcategoria)) {
      return true;
    } else {
      this.imagenGroup.value.subcategoria = undefined;
    }
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

  addImagen() {

    this.showSpinner();

    this.imagen = this.imagenGroup.value;

    const res = {
      fileImg: this.fileImg,
      fileNameImg: this.fileNameImg,
      filePathImg: this.filePathImg,
      fileAudio: this.fileAudio,
      filePathAudio: this.filePathAudio,
      imagen: this.imagen
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
        this.categoriasService.postCategoria(res)
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
        this.verbosService.postVerbo(res)
          .subscribe(res => {
            this.hideSpinner();
            M.toast({ html: 'Verbo registrado exitosamente!' })
            this.getCategorias();
          })
      }
    });
  }

}