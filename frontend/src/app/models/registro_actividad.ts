export class RegistroActividad {

    constructor(_id = '', paciente = '', actividad = '', fecha_actividad = new Date(),
        duracion_actividad = 0, imagenes_actividad = [], imagenes_errores = [], cant_niveles = 0,
        cant_errores = 0, aprobacion = 0, observacion_final = '') {

        this._id = _id;
        this.paciente = paciente;
        this.actividad = actividad;
        this.fecha_actividad = fecha_actividad;
        this.duracion_actividad = duracion_actividad;
        this.imagenes_actividad = imagenes_actividad;
        this.imagenes_errores = imagenes_errores;
        this.cant_niveles = cant_niveles;
        this.cant_errores = cant_errores;
        this.aprobacion = aprobacion;
        this.observacion_final = observacion_final;
    }

    _id: string;
    paciente: any;
    actividad: any;
    fecha_actividad: Date;
    duracion_actividad: number;
    imagenes_actividad: Array<string>;
    imagenes_errores: Array<string>;
    cant_niveles: number;
    cant_errores: number;
    aprobacion: number;
    observacion_final: string;

}