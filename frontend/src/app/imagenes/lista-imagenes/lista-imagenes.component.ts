import { Component, OnInit } from '@angular/core';
import { ImagenService } from 'src/app/shared/services/imagen.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Imagen } from 'src/app/models/imagen';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubirImagenComponent } from '../subir-imagen/subir-imagen.component';
import { AngularFireStorage } from '@angular/fire/storage/';
import { catchError, finalize } from 'rxjs/operators';
import { InfoImagenComponent } from '../info-imagen/info-imagen.component';
import { EditarImagenComponent } from '../editar-imagen/editar-imagen.component';
import { EliminarImagenComponent } from '../eliminar-imagen/eliminar-imagen.component';

declare var M: any;

@Component({
  selector: 'app-lista-imagenes',
  templateUrl: './lista-imagenes.component.html',
  styleUrls: ['./lista-imagenes.component.css']
})
export class ListaImagenesComponent implements OnInit {

  imagenes;
  tagResize = '_500x500';
  imagen: Imagen;
  urlImg; taskImg; fileRefImg;
  urlAudio; taskAudio; fileRefAudio;
  hayUrlImg = false;
  hayUrlAudio = false;
  delUrlImg = false;
  delUrlAudio = false;
  idImg;

  constructor(private imagenService: ImagenService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private afStorage: AngularFireStorage,
    public dialog: MatDialog) { }


  ngOnInit() {
    this.hayUrlImg = false;
    this.hayUrlAudio = false;
    this.getImagenes();
  }

  showSpinner() {
    this.spinner.show();
  }
  hideSpinner() {
    this.spinner.hide();
  }

  // Subir nueva imagen
  subirImagen() {
    const dialogRef = this.dialog.open(SubirImagenComponent, {
      width: '800px',
      data: { name: 'nothing' },
      autoFocus: false,
      maxHeight: '90vh',
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.hayUrlAudio, this.hayUrlImg = false;
        this.urlImg, this.urlAudio = '';
        // firebase upload
        const taskImg = this.afStorage.upload(res.filePathImg, res.fileImg);
        const fileRefImg = this.afStorage.ref(res.filePathImg);
        const taskAudio = this.afStorage.upload(res.filePathAudio, res.fileAudio);
        const fileRefAudio = this.afStorage.ref(res.filePathAudio);
        // load image 
        this.imagen = res.imagen;
        this.getUrlImg(taskImg, fileRefImg, res.fileNameImg);
        this.getUrlAudio(taskAudio, fileRefAudio);
      }
    });

  }

  // Se llama servicio para subir imagen
  uploadImg() {
    if (this.hayUrlImg && this.hayUrlAudio) {
      this.imagen.urlImg = this.urlImg;
      this.imagen.urlAudio = this.urlAudio;
      this.imagenService.postImagen(this.imagen)
        .subscribe(res => {
          this.hideSpinner();
          M.toast({ html: 'Imagen registrada exitosamente!' })
          this.getImagenes();
        });
    }

  }
  // get notified when the URL IMG is available
  getUrlImg(taskImg, fileRefImg, fileName) {
    taskImg.snapshotChanges().pipe(
      finalize(() => fileRefImg.getDownloadURL().subscribe((url) => {
        if (url) {
          this.urlImg = url;
          this.urlImg = this.urlImg.replace(fileName, fileName + this.tagResize);
          this.hayUrlImg = true;
          this.uploadImg();
        }
      }))).subscribe();
  }

  // get notified when the URL AUDIO is available
  getUrlAudio(taskAudio, fileRefAudio) {
    taskAudio.snapshotChanges().pipe(
      finalize(() => fileRefAudio.getDownloadURL().subscribe((url) => {
        if (url) {
          this.urlAudio = url;
          this.hayUrlAudio = true;
          this.uploadImg();
        }
      }))).subscribe();
  }

  // Ver detalle de la imagen
  verImagen(idImagen: string) {

    let Imagen: Imagen;

    this.imagenes.forEach(imagen => {
      if (imagen._id == idImagen) {
        Imagen = imagen;
      }
    });

    const dialogRef = this.dialog.open(InfoImagenComponent, {
      width: '800px',
      data: Imagen,
      autoFocus: false,
      maxHeight: '90vh',
    });

  }

  editImagen(idImagen: string) {
    const dialogRef = this.dialog.open(EditarImagenComponent, {
      width: '800px',
      data: idImagen,
      autoFocus: false,
      maxHeight: '90vh'
    });

    dialogRef.afterClosed().subscribe(res => {

      let imagen: Imagen;

      if (res) {
        // Se edita solo modelo de imagen
        if (!res.fileImg && !res.fileAudio) {
          this.editImg(res.imagen);
        }
        // Se editan todos los campos de la imagen
        else if (res.fileImg && res.fileAudio) {
          this.editAllImg(res);
        }
        // Se edita solo el archivo de imagen
        else if (res.fileImg && !res.fileAudio) {
          this.editUrlImg(res);
        }
        // Se edita solo el archivo de audio
        else if (!res.fileImg && res.fileAudio) {
          this.editUrlAudio(res);
        }

      }
    });
  }

  // Editar imagen
  editAllImg(res) {
    // firebase ref
    const taskImg = this.afStorage.upload(res.filePathImg, res.fileImg);
    const fileRefImg = this.afStorage.ref(res.filePathImg);

    // get notified when the URL IMG is available
    taskImg.snapshotChanges().pipe(
      finalize(() => fileRefImg.getDownloadURL().subscribe((url) => {
        if (url) {
          this.deleteUrlImg(res.imagen.urlImg);
          const urlImg = url.replace(res.fileNameImg, res.fileNameImg + this.tagResize)
          res.imagen.urlImg = urlImg;
          this.editUrlAudio(res);
        }
      }))).subscribe();
  }

  // Editar url imagen de Firebase
  editUrlImg(res) {
    // Firebase reference
    const taskImg = this.afStorage.upload(res.filePathImg, res.fileImg);
    const fileRefImg = this.afStorage.ref(res.filePathImg);

    // get notified when the URL IMG is available
    taskImg.snapshotChanges().pipe(
      finalize(() => fileRefImg.getDownloadURL().subscribe((url) => {
        if (url) {
          this.deleteUrlImg(res.imagen.urlImg);
          const urlImg = url.replace(res.fileNameImg, res.fileNameImg + this.tagResize)
          res.imagen.urlImg = urlImg;
          this.editImg(res.imagen);
        }
      }))).subscribe();
  }

  // Editar url audio de Firebase
  editUrlAudio(res) {
    // Firebase reference
    const taskAudio = this.afStorage.upload(res.filePathAudio, res.fileAudio);
    const fileRefAudio = this.afStorage.ref(res.filePathAudio);

    // get notified when the URL AUDIO is available
    taskAudio.snapshotChanges().pipe(
      finalize(() => fileRefAudio.getDownloadURL().subscribe((url) => {
        if (url) {
          this.deleteUrlAudio(res.imagen.urlAudio);
          res.imagen.urlAudio = url;
          this.editImg(res.imagen);
        }
      }))).subscribe();
  }

  // Se llama a servicio para editar imágenes
  editImg(imagen: Imagen) {
    this.imagenService.putImagen(imagen).subscribe(res => {
      this.hideSpinner();
      M.toast({ html: 'Imagen editada exitosamente!' })
      this.getImagenes();
    })
  }

  // Se llama a servicio para obtener imágenes
  getImagenes() {
    this.showSpinner();
    this.imagenService.getImagenes()
      .subscribe(res => {
        this.imagenService.imagenes = res as Imagen[];
        this.imagenes = this.imagenService.imagenes;
        this.sortImgNombre();
        this.hideSpinner();
      });
  }

  // Ordenar por nombre
  sortImgNombre() {
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
    this.imagenes.sort(compare);
  }

  // Ordenar por categoría
  sortImgCat() {
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
    this.imagenes.sort(compare);
  }

  // Ordenar por subcategoría
  sortImgSubCat() {
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
    this.imagenes.sort(compare);
  }

  // Eliminar imagen
  deleteImagen(idImagen: string) {

    let nombreImagen;

    this.idImg = idImagen;

    this.imagenes.forEach(imagen => {
      if (imagen._id == this.idImg) {
        nombreImagen = imagen.nombre;
      }
    });

    const dialogRef = this.dialog.open(EliminarImagenComponent, {
      maxWidth: '400px',
      data: nombreImagen,
    })

    dialogRef.afterClosed().subscribe(res => {

      if (res == true) {
        this.showSpinner();
        this.imagenService.getImagen(idImagen).subscribe(res => {
          this.imagenService.imagen = res as Imagen;
          this.imagen = this.imagenService.imagen;
          this.urlImg = this.imagen.urlImg;
          this.urlAudio = this.imagen.urlAudio;
          this.deleteUrlImg(this.urlImg);
          this.deleteUrlAudio(this.urlAudio);
        });
      }
    });
  }

  // Servicio de eliminación de imagen
  deleteImg() {
    if (this.delUrlImg && this.delUrlAudio) {
      // Delete Image Service
      this.imagenService.deleteImagen(this.idImg)
        .subscribe(res => {
          M.toast({ html: '¡Imagen eliminada exitosamente!' })
          this.getImagenes();
        });
    }

  }

  // Servicio de Firebase de eliminación de url de la imagen 
  deleteUrlImg(urlImg) {
    this.afStorage.storage.refFromURL(urlImg).delete();
    this.delUrlImg = true;
    this.deleteImg();
  }

  // Servicio de Firebase de eliminación de url del audio 
  deleteUrlAudio(urlAudio) {
    this.afStorage.storage.refFromURL(urlAudio).delete();
    this.delUrlAudio = true;
    this.deleteImg();
  }

  regresar() {
    this.router.navigate(['../']);
  }

}
