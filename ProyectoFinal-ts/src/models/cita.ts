export class Cita{

    constructor(
        public id:number,
        public idPaciente:number,
        public idMedico:number,
        public fecha:string,
        public hora:string,
        public motivo:string,
        public estado:string="Pendiente"
    ){}

}