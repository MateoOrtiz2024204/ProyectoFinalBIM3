import { IncomingMessage, ServerResponse } from "http";
import { HistorialClinicoController } from "../controllers/historialClinicoController";
import { enviarError } from "../utils/http";

const controller = new HistorialClinicoController();

export async function historialClinicoRoutes(req: IncomingMessage, res: ServerResponse, partes: string[]) {
    try {
        if (req.method === "GET" && partes[0] === "paciente" && partes[1]) {
            return controller.buscarPorPaciente(req, res, Number(partes[1]));
        }
        if (req.method === "GET" && partes.length === 0) return controller.listar(req, res);
        if (req.method === "POST") return controller.agregar(req, res);
        enviarError(res, 405, "Metodo no permitido");
    } catch {
        enviarError(res, 500, "Error interno del servidor");
    }
}
