import { IncomingMessage, ServerResponse } from "http";
import { HorarioController } from "../controllers/horarioController";
import { enviarError } from "../utils/http";

const controller = new HorarioController();

export async function horarioRoutes(req: IncomingMessage, res: ServerResponse, partes: string[]) {
    try {
        if (req.method === "GET" && partes[0] === "medico" && partes[1]) {
            return controller.buscarPorMedico(req, res, Number(partes[1]));
        }
        const id = partes[0] ? Number(partes[0]) : undefined;
        if (req.method === "GET" && id === undefined) return controller.listar(req, res);
        if (req.method === "POST") return controller.agregar(req, res);
        if (req.method === "PUT" && id !== undefined) return controller.actualizar(req, res, id);
        if (req.method === "DELETE" && id !== undefined) return controller.eliminar(req, res, id);
        enviarError(res, 405, "Metodo no permitido");
    } catch {
        enviarError(res, 500, "Error interno del servidor");
    }
}
