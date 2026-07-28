import { IncomingMessage, ServerResponse } from "http";
import { LoginService } from "../services/loginService";
import { leerBody, enviarJSON, enviarError } from "../utils/http";

const service = new LoginService();

export class LoginController {

    async login(req: IncomingMessage, res: ServerResponse) {
        try {
            const body = await leerBody(req);
            const resultado = await service.login(body.correo, body.contrasena);
            enviarJSON(res, 200, resultado);
        } catch (e: any) {
            enviarError(res, 400, e.message);
        }
    }

}
