import { Estado } from "./estado";
import { Rol } from "./rol";

export abstract class Usuario {

    constructor(
        public id: number,
        public nombre: string,
        public apellido: string,
        public rol: Rol,
        public estado: Estado = "activo"
    ) {}

    abstract mostrarInfo(): string;
}