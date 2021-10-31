import { Verbo } from "./verbo";

export class Imagen {

    constructor(_id = '', nombre = '', silabas = '', categoria = '', subcategoria = '', fonema = '', difono = [], urlImg = '', urlAudio = '', definicion = '', verbo = "") {
        this._id = _id;
        this.nombre = nombre;
        this.silabas = silabas;
        this.categoria = categoria;
        this.subcategoria = subcategoria;
        this.fonema = fonema;
        this.difono = difono;
        this.urlImg = urlImg;
        this.urlAudio = urlAudio;
        this.definicion = definicion;
        this.verbo = verbo;
    }

    _id: string;
    nombre: string;
    silabas: string;
    categoria: string;
    subcategoria: string;
    fonema: string;
    difono: Array<string>;
    urlImg: string;
    urlAudio: string;
    definicion: string;
    verbo: string;
}