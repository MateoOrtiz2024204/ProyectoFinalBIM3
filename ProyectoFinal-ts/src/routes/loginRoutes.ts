import { IncomingMessage, ServerResponse } from "http";
import { LoginController } from "../controllers/loginController";
import { enviarError } from "../utils/http";

const controller = new LoginController();

export async function loginRoutes(req: IncomingMessage, res: ServerResponse, partes: string[]) {
    try {
        if (req.method === "POST" && partes.length === 0) return controller.login(req, res);
        enviarError(res, 405, "Metodo no permitido");
    } catch {
        enviarError(res, 500, "Error interno del servidor");
    }
}
