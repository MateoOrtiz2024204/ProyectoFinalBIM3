export class Medicamento{

    constructor(
        public id:number,
        public nombre:string,
        public presentacion:string,
        public concentracion:string,
        public laboratorio:string,
        public requiereReceta:boolean,
        public estado:boolean=true
    ){}

}