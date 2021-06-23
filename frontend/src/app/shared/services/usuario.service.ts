import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  seleccionUsuario: Usuario;
  usuarios: Usuario[];
  usuario: Usuario;

  // Variables de entorno para API de Pacientes
  readonly URL_API = environment.URL_API_USUARIOS;

  constructor(private http: HttpClient) {
    this.seleccionUsuario = new Usuario();
  }

  /* Usuarios: CRUD Service */

  getUsuario(_id: string) {
    return this.http.get(this.URL_API + `/${_id}`);
  }

  getUsuarios() {
    return this.http.get(this.URL_API);
  }

  postUsuario(usuario: Usuario) {
    return this.http.post(this.URL_API, usuario);
  }

  putUsuario(usuario: Usuario) {
    return this.http.put(this.URL_API + `/${usuario._id}`, usuario);
  }

  deleteUsuario(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}
