import { LoginRepository } from "../repositories/loginRepository";

export class LoginService {

    private repo = new LoginRepository();

    async login(correo: string, contrasena: string) {
        if (!correo || !contrasena) throw new Error("Correo y contrasena son requeridos");
        const resultado = await this.repo.validar(correo, contrasena);
        if (!resultado || resultado.length === 0) throw new Error("Credenciales invalidas");
        return resultado[0];
    }

}
