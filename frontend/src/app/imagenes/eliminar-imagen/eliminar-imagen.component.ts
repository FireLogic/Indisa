import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-eliminar-imagen',
  templateUrl: './eliminar-imagen.component.html',
  styleUrls: ['./eliminar-imagen.component.css']
})
export class EliminarImagenComponent implements OnInit {

  imagen;

  constructor(public dialogRef: MatDialogRef<EliminarImagenComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
    this.imagen = this.data;
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  cancelarEnvioDatos() {
    this.dialogRef.close(false);
  }

  confirmarEnvioDatos() {
    this.dialogRef.close(true);
  }

}
