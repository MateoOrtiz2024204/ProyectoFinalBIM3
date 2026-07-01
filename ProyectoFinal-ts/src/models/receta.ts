export class Receta{

    constructor(
        public id:number,
        public idHistorial:number,
        public idMedico:number,
        public idPaciente:number,
        public idInventario:number,
        public fechaReceta:string,
        public dosis:string,
        public duracionDias:number,
        public cantidadRecetada:number,
        public estado:string="Pendiente"
    ){}

}