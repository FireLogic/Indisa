import { Injectable } from '@angular/core';
import { RegistroActividad } from '../../models/registro_actividad';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistroActividadService {

  seleccionRegistro: RegistroActividad;
  registrosActividades: RegistroActividad[];
  registroActividad: RegistroActividad;

   // Variables de entorno para API de Registro de actividades
  readonly URL_API = environment.URL_API_REGISTRO_ACTIVIDADES;

  constructor(private http: HttpClient) {
    this.seleccionRegistro = new RegistroActividad();
  }

  /* Registro de actividad: CRUD Service */

  getRegistroActividad(_id: string) {
    return this.http.get(this.URL_API + `/${_id}`);
  }

  getRegistrosActividades() {
    return this.http.get(this.URL_API);
  }

  postRegistroActividad(registroActividad: RegistroActividad) {
    return this.http.post(this.URL_API, registroActividad);
  }

  putRegistroActividad(registroActividad: RegistroActividad) {
    return this.http.put(this.URL_API + `/${registroActividad._id}`, registroActividad);
  }

  deleteRegistroActividad(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }

}
