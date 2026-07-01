import { Usuario } from "./usuario";
import { Rol } from "./rol";
import { Estado } from "./estado";

export class Medico extends Usuario{

    constructor(
        id:number,
        nombre:string,
        apellido:string,
        public idEspecialidad:number,
        public telefono:string,
        public numeroColegiado:string,
        estado:Estado="activo"
    ){
        super(id,nombre,apellido,Rol.MEDICO,estado);
    }

    mostrarInfo():string{
        return `Médico #${this.id} - ${this.nombre} ${this.apellido} | Colegiado: ${this.numeroColegiado}`;
    }

}