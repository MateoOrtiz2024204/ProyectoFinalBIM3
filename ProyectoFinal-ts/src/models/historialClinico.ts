export class HistorialClinico{

    constructor(
        public id:number,
        public idPaciente:number,
        public idMedico:number,
        public fechaVisita:string,
        public diagnostico:string,
        public tratamiento:string,
        public medicamentos:string,
        public observaciones:string
    ){}

}