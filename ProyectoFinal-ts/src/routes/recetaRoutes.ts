import { IncomingMessage, ServerResponse } from "http";
import { RecetaController } from "../controllers/recetaController";
import { enviarError } from "../utils/http";

const controller = new RecetaController();

export async function recetaRoutes(req: IncomingMessage, res: ServerResponse, partes: string[]) {
    try {
        const id = partes[0] ? Number(partes[0]) : undefined;
        if (req.method === "PATCH" && id !== undefined && partes[1] === "estado") {
            return controller.actualizarEstado(req, res, id);
        }
        if (req.method === "GET" && id === undefined) return controller.listar(req, res);
        if (req.method === "POST") return controller.agregar(req, res);
        enviarError(res, 405, "Metodo no permitido");
    } catch {
        enviarError(res, 500, "Error interno del servidor");
    }
}
