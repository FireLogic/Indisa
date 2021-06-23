import { Injectable } from '@angular/core';
import { Categoria } from 'src/app/models/categoria';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  seleccionCategoria: Categoria;
  categorias: Categoria[];
  categoria: Categoria;

   // Variables de entorno para API de Categorías
  readonly URL_API = environment.URL_API_CATEGORIAS;

  constructor(private http: HttpClient) {
    this.seleccionCategoria = new Categoria();
  }

  /* Categoría: CRUD Service */

  getCategoria(_id: string) {
    return this.http.get(this.URL_API + `/${_id}`);
  }

  getCategorias() {
    return this.http.get(this.URL_API);
  }

  postCategoria(categoria: Categoria) {
    return this.http.post(this.URL_API, categoria);
  }

  putCategoria(categoria: Categoria) {
    return this.http.put(this.URL_API + `/${categoria._id}`, categoria);
  }

  deleteCategoria(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}