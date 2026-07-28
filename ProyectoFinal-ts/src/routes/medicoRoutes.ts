import { IncomingMessage, ServerResponse } from "http";
import { MedicoController } from "../controllers/medicoController";
import { enviarError } from "../utils/http";

const controller = new MedicoController();

export async function medicoRoutes(req: IncomingMessage, res: ServerResponse, partes: string[]) {
    const id = partes[0] ? Number(partes[0]) : undefined;
    try {
        if (req.method === "GET" && id === undefined) return controller.listar(req, res);
        if (req.method === "POST") return controller.agregar(req, res);
        if (req.method === "PUT" && id !== undefined) return controller.actualizar(req, res, id);
        if (req.method === "DELETE" && id !== undefined) return controller.eliminar(req, res, id);
        enviarError(res, 405, "Metodo no permitido");
    } catch {
        enviarError(res, 500, "Error interno del servidor");
    }
}
