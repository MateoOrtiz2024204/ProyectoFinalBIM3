export class Inventario{

    constructor(
        public id:number,
        public idMedicamento:number,
        public cantidadDisponible:number,
        public cantidadMinima:number,
        public fechaVencimiento:string,
        public estado:boolean=true
    ){}

}