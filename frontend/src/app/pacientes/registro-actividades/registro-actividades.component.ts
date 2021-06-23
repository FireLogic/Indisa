import { Component, OnInit, Inject } from '@angular/core';
import { RegistroActividadService } from 'src/app/shared/services/registro-actividad.service';
import { MatDialogRef, MAT_DIALOG_DATA, throwMatDialogContentAlreadyAttachedError } from '@angular/material';
import { RegistroActividad } from 'src/app/models/registro_actividad';

@Component({
  selector: 'app-registro-actividades',
  templateUrl: './registro-actividades.component.html',
  styleUrls: ['./registro-actividades.component.css']
})
export class RegistroActividadesComponent implements OnInit {

  registroActividades;
  detalleRegistro: boolean;
  detalleImgAct: boolean;
  detalleImgErr: boolean;
  pocentajeAprobacion: number;
  duracionActividad: string;
  registroActividad: RegistroActividad;

  constructor(private readonly registroService: RegistroActividadService,
    public dialogRef: MatDialogRef<RegistroActividadesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
    this.verRegistroActividades(this.data);
    this.detalleRegistro = false;
    this.detalleImgAct = false;
    this.detalleImgErr = false;
  }

  // Se llama a servicio para obtener registro histórico de actividades
  verRegistroActividades(id) {

    this.registroService.getRegistroActividad(id)
      .subscribe(res => {
        this.registroService.registroActividad = res as RegistroActividad;
        this.registroActividades = this.registroService.registroActividad;

        this.registroActividades.forEach(registro => {
          registro.aprobacion = this.calcularPorcentaje(registro.aprobacion);
        });

      });
  }

  // Formato de porcentaje de aprobación
  calcularPorcentaje(aprobacion: number) {
    let porcentaje = (aprobacion * 100);
    const porcentajeTrun = porcentaje.toFixed();
    return porcentajeTrun;
  }

  // Ver detalle de registro de actividad
  verDetalleRegistro(id) {
    this.detalleRegistro = true;

    this.registroActividades.forEach((registro: RegistroActividad) => {
      if (id == registro._id) {
        this.registroActividad = registro;
        this.formatDuration(this.registroActividad.duracion_actividad);
      }
    });

  }

  // Formato de duración de la actividad
  formatDuration(dSeconds: number) {
    const dateObj = new Date(dSeconds * 1000);
    const hours = dateObj.getUTCHours();
    const minutes = dateObj.getUTCMinutes();
    const seconds = dateObj.getSeconds();

    this.duracionActividad = hours.toString().padStart(2, '0') + ':' +
      minutes.toString().padStart(2, '0') + ':' +
      seconds.toString().padStart(2, '0');
  }

  verImgAct() {
    (this.detalleImgAct) ? this.detalleImgAct = false : this.detalleImgAct = true;
  }

  verImgErr() {
    (this.detalleImgErr) ? this.detalleImgErr = false : this.detalleImgErr = true;
  }

  regresar() {
    this.detalleRegistro = false;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }



}
