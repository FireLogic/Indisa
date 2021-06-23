import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-eliminar-paciente',
  templateUrl: './eliminar-paciente.component.html',
  styleUrls: ['./eliminar-paciente.component.css']
})
export class EliminarPacienteComponent implements OnInit {

  paciente;

  constructor(public dialogRef: MatDialogRef<EliminarPacienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
    this.paciente = this.data;
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
