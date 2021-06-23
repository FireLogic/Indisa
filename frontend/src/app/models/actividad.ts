export class Actividad {

    constructor(_id = '', name = '') {
        this._id = _id;
        this.name = name;
    }

    _id: string;
    name: string;
}