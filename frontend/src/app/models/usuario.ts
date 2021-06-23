export class Usuario {

    constructor(_id = '', auth_id = '', nombre = '', correo = '', perfil = '') {
        this._id = _id;
        this.auth_id = auth_id
        this.nombre = nombre;
        this.correo = correo;
        this.perfil = perfil;
    }

    _id: string;
    auth_id: string;
    nombre: string;
    correo: string;
    perfil: string;
}