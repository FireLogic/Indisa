import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Paciente } from '../../models/paciente';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  seleccionPaciente: Paciente;
  pacientes: Paciente[];
  paciente: Paciente;

  // Variables de entorno para API de Pacientes
  readonly URL_API = environment.URL_API_PACIENTES;

  constructor(private http: HttpClient) {
    this.seleccionPaciente = new Paciente();
  }

  /* Paciente: CRUD Service */

  getPaciente(_id: string) {
    return this.http.get(this.URL_API + `/${_id}`);
  }

  getPacientes() {
    return this.http.get(this.URL_API);
  }

  postPaciente(paciente: Paciente) {
    return this.http.post(this.URL_API, paciente);
  }

  putPaciente(paciente: Paciente) {
    return this.http.put(this.URL_API + `/${paciente._id}`, paciente);
  }

  deletePaciente(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}
