export class Tarea {

    constructor(_id = '', emisor = '', receptor = '', fecha_envio = new Date(),
        actividad = {}, realizada = false) {

        this._id = _id;
        this.emisor = emisor;
        this.receptor = receptor;
        this.fecha_envio = fecha_envio;
        this.actividad = actividad;
        this.realizada = realizada;
    }

    _id: string;
    emisor: string;
    receptor: string;
    fecha_envio: Date;
    fecha_realizada: Date;
    actividad: any;
    realizada: boolean;
}