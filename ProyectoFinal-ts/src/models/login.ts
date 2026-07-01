import { Rol } from "./rol";

export class Login{

    constructor(
        public id:number,
        public correo:string,
        public usuario:string,
        public contrasena:string,
        public rol:Rol,
        public estado:boolean=true
    ){}

}