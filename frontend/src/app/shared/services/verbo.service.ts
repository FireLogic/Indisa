import { Injectable } from '@angular/core';
import { Verbo } from 'src/app/models/verbo';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VerboService {

  seleccionVerbo: Verbo;
  verbos: Verbo[];
  verbo: Verbo;

   // Variables de entorno para API de Verbos
  readonly URL_API = environment.URL_API_VERBOS;

  constructor(private http: HttpClient) {
    this.seleccionVerbo = new Verbo();
  }

  /* Categoría: CRUD Service */

  getVerbo(_id: string) {
    return this.http.get(this.URL_API + `/${_id}`);
  }

  getVerbos() {
    return this.http.get(this.URL_API);
  }

  postVerbo(verbo: Verbo) {
    return this.http.post(this.URL_API, verbo);
  }

  putVerbo(verbo: Verbo) {
    return this.http.put(this.URL_API + `/${verbo._id}`, verbo);
  }

  deleteVerbo(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}