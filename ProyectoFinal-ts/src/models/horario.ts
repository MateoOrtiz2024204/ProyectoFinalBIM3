export class Horario{

    constructor(
        public id:number,
        public idMedico:number,
        public diaSemana:string,
        public horaInicio:string,
        public horaFin:string,
        public estado:boolean=true
    ){}

}