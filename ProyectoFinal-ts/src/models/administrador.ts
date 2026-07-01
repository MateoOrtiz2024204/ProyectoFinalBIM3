import { Usuario } from "./usuario";
import { Rol } from "./rol";
import { Estado } from "./estado";

export class Administrador extends Usuario {

    constructor(
        id: number,
        nombre: string,
        apellido: string,
        public departamento: string,
        estado: Estado = "activo"
    ){
        super(id,nombre,apellido,Rol.ADMINISTRADOR,estado);
    }

    mostrarInfo(): string{
        return `Administrador #${this.id} - ${this.nombre} ${this.apellido} | Departamento: ${this.departamento}`;
    }

}