import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-ventana-info',
  templateUrl: './ventana-info.component.html',
  styleUrls: ['./ventana-info.component.css']
})
export class VentanaInfoComponent implements OnInit {

  mensaje;
  tipo;

  constructor(public dialogRef: MatDialogRef<VentanaInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    // Se define el tipo de ventana y el mensaje a mostrar
    this.mensaje = this.data.mensaje;
    this.tipo = this.data.tipo;
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
