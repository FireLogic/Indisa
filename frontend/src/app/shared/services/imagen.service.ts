import { Injectable } from '@angular/core';
import { Imagen } from '../../models/imagen';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  seleccionImagen: Imagen;
  imagenes: Imagen[];
  imagen: Imagen;

   // Variables de entorno para API de Imágenes
  readonly URL_API = environment.URL_API_IMAGENES;

  constructor(private http: HttpClient) {
    this.seleccionImagen = new Imagen();
  }

  /* Imagen: CRUD Service */

  getImagen(_id: string) {
    return this.http.get(this.URL_API + `/${_id}`);
  }

  getImagenes() {
    return this.http.get(this.URL_API);
  }

  postImagen(imagen: Imagen) {
    return this.http.post(this.URL_API, imagen);
  }

  putImagen(imagen: Imagen) {
    return this.http.put(this.URL_API + `/${imagen._id}`, imagen);
  }

  deleteImagen(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }

}