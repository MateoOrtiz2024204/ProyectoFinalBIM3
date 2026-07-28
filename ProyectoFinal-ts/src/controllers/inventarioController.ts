import { IncomingMessage, ServerResponse } from "http";
import { InventarioService } from "../services/inventarioService";
import { leerBody, enviarJSON, enviarError } from "../utils/http";

const service = new InventarioService();

export class InventarioController {

    async listar(_req: IncomingMessage, res: ServerResponse) {
        try {
            enviarJSON(res, 200, await service.listar());
        } catch (e: any) {
            enviarError(res, 500, e.message);
        }
    }

    async stockBajo(_req: IncomingMessage, res: ServerResponse) {
        try {
            enviarJSON(res, 200, await service.stockBajo());
        } catch (e: any) {
            enviarError(res, 500, e.message);
        }
    }

    async agregar(req: IncomingMessage, res: ServerResponse) {
        try {
            const body = await leerBody(req);
            await service.agregar(body);
            enviarJSON(res, 201, { mensaje: "Inventario agregado" });
        } catch (e: any) {
            enviarError(res, 400, e.message);
        }
    }

    async actualizar(req: IncomingMessage, res: ServerResponse, id: number) {
        try {
            const body = await leerBody(req);
            await service.actualizar(id, body);
            enviarJSON(res, 200, { mensaje: "Inventario actualizado" });
        } catch (e: any) {
            enviarError(res, 400, e.message);
        }
    }

    async actualizarStock(req: IncomingMessage, res: ServerResponse, id: number) {
        try {
            const body = await leerBody(req);
            await service.actualizarStock(id, body.cantidad);
            enviarJSON(res, 200, { mensaje: "Stock actualizado" });
        } catch (e: any) {
            enviarError(res, 400, e.message);
        }
    }

    async eliminar(_req: IncomingMessage, res: ServerResponse, id: number) {
        try {
            await service.eliminar(id);
            enviarJSON(res, 200, { mensaje: "Inventario eliminado" });
        } catch (e: any) {
            enviarError(res, 400, e.message);
        }
    }

}
