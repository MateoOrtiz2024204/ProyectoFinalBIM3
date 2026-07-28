import { IncomingMessage, ServerResponse } from "http";
import { InventarioController } from "../controllers/inventarioController";
import { enviarError } from "../utils/http";

const controller = new InventarioController();

export async function inventarioRoutes(req: IncomingMessage, res: ServerResponse, partes: string[]) {
    try {
        if (req.method === "GET" && partes[0] === "stock-bajo") {
            return controller.stockBajo(req, res);
        }
        const id = partes[0] ? Number(partes[0]) : undefined;
        if (req.method === "PATCH" && id !== undefined && partes[1] === "stock") {
            return controller.actualizarStock(req, res, id);
        }
        if (req.method === "GET" && id === undefined) return controller.listar(req, res);
        if (req.method === "POST") return controller.agregar(req, res);
        if (req.method === "PUT" && id !== undefined) return controller.actualizar(req, res, id);
        if (req.method === "DELETE" && id !== undefined) return controller.eliminar(req, res, id);
        enviarError(res, 405, "Metodo no permitido");
    } catch {
        enviarError(res, 500, "Error interno del servidor");
    }
}
