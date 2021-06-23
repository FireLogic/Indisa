export class Categoria {

    constructor(_id = '', nombre = '', subcategorias = []) {
        this._id = _id;
        this.nombre = nombre;
        this.subcategorias = subcategorias
    }

    _id: string;
    nombre: string;
    subcategorias: Array<string>;
}