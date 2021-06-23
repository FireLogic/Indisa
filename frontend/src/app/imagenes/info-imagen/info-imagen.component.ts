import { Component, OnInit, Inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ImagenService } from 'src/app/shared/services/imagen.service';
import { Imagen } from 'src/app/models/imagen';

declare var M: any;

@Component({
  selector: 'app-info-imagen',
  templateUrl: './info-imagen.component.html',
  styleUrls: ['./info-imagen.component.css']
})
export class InfoImagenComponent implements OnInit {

  imagen: Imagen;

  constructor(private readonly imagenService: ImagenService,
    private spinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<InfoImagenComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Imagen) { }

  ngOnInit() {
    this.imagen = this.data;
  }

  playAudio() {
    M.Toast.dismissAll();
    M.toast({ html: 'Reproduciendo audio...', classes: 'rounded' })
    let audio = new Audio();
    audio.src = this.imagen.urlAudio;
    audio.load();
    audio.play();
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

}
