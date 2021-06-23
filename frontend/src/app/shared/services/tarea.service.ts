import { Injectable } from '@angular/core';
import { Tarea } from 'src/app/models/tarea';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  seleccionTarea: Tarea;
  tareas: Tarea[];
  tarea: Tarea;

  // Variables de entorno para API de Tareas.
  readonly URL_API = environment.URL_API_TAREAS;

  constructor(private http: HttpClient) {
    this.seleccionTarea = new Tarea();
  }

  /* Tareas: CRUD Service */

  getTarea(_id: string) {
    return this.http.get(this.URL_API + `/${_id}`);
  }

  getTareas() {
    return this.http.get(this.URL_API);
  }

  postTarea(tarea: Tarea) {
    return this.http.post(this.URL_API, tarea);
  }

  putTarea(tarea: Tarea) {
    return this.http.put(this.URL_API + `/${tarea._id}`, tarea);
  }

  deleteTarea(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }

}