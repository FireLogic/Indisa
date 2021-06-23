export class Paciente {

    constructor(_id = '', nombre = '', responsables = [], fecha_nacimiento = new Date(), rut = '', direccion = '', tel_fijo = 0, tel_celular = 0, correo = '', escolaridad = '', ocupacion = '',
        diagnostico = '', dias_hospital = 0, examenes_realizados = '', historico_clinica = '', familiar_nombre = '', familiar_parentesco = '') {
        this._id = _id;
        this.nombre = nombre;
        this.responsables = responsables;
        this.fecha_nacimiento = fecha_nacimiento;
        this.rut = rut;
        this.direccion = direccion;
        this.tel_fijo = tel_fijo;
        this.tel_celular = tel_celular;
        this.correo = correo;
        this.escolaridad = escolaridad;
        this.ocupacion = ocupacion;
        this.diagnostico = diagnostico;
        this.dias_hospital = dias_hospital;
        this.examenes_realizados = examenes_realizados;
        this.historico_clinica = historico_clinica;
        this.familiar_nombre = familiar_nombre;
        this.familiar_parentesco = familiar_parentesco;
    }

    _id: string;
    nombre: string;
    responsables: Array<any>;
    fecha_nacimiento: Date;
    rut: string;
    direccion: string;
    tel_fijo: number;
    tel_celular: number;
    correo: string;
    escolaridad: string;
    ocupacion: string;
    diagnostico: string;
    dias_hospital: number;
    examenes_realizados: string;
    historico_clinica: string;
    familiar_nombre: string;
    familiar_parentesco: string;
}
