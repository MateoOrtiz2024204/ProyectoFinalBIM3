import { Usuario } from "./usuario";
import { Rol } from "./rol";
import { Estado } from "./estado";

export class Paciente extends Usuario{

    constructor(
        id:number,
        nombre:string,
        apellido:string,
        public fechaNacimiento:string,
        public genero:string,
        public telefono:string,
        public direccion:string,
        public tipoSangre:string,
        public alergias:string,
        estado:Estado="activo"
    ){
        super(id,nombre,apellido,Rol.PACIENTE,estado);
    }

    mostrarInfo():string{
        return `Paciente #${this.id} - ${this.nombre} ${this.apellido}`;
    }

}