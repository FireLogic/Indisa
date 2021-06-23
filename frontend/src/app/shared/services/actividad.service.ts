import { Injectable } from '@angular/core';
import { Actividad } from '../../models/actividad';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  seleccionActividad: Actividad;
  actividades: Actividad[];
  actividad: Actividad;
  
  // Variables de entorno para API de Actividades
  readonly URL_API = environment.URL_API_ACTIVIDADES;

  constructor(private http: HttpClient) {
    this.seleccionActividad = new Actividad();
  }

  /* Actividad: CRUD Service */

  getActividad(_id: string) {
    return this.http.get(this.URL_API + `/${_id}`);
  }

  getActividades() {
    return this.http.get(this.URL_API);
  }

  postActividad(actividad: Actividad) {
    return this.http.post(this.URL_API, actividad);
  }

  putActividad(actividad: Actividad) {
    return this.http.put(this.URL_API + `/${actividad._id}`, actividad);
  }

  deleteActividad(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}