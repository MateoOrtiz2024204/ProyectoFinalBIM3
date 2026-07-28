import { IncomingMessage, ServerResponse } from "http";
import { RecetaService } from "../services/recetaService";
import { leerBody, enviarJSON, enviarError } from "../utils/http";

const service = new RecetaService();

export class RecetaController {

    async listar(_req: IncomingMessage, res: ServerResponse) {
        try {
            enviarJSON(res, 200, await service.listar());
        } catch (e: any) {
            enviarError(res, 500, e.message);
        }
    }

    async agregar(req: IncomingMessage, res: ServerResponse) {
        try {
            const body = await leerBody(req);
            await service.agregar(body);
            enviarJSON(res, 201, { mensaje: "Receta agregada" });
        } catch (e: any) {
            enviarError(res, 400, e.message);
        }
    }

    async actualizarEstado(req: IncomingMessage, res: ServerResponse, id: number) {
        try {
            const body = await leerBody(req);
            await service.actualizarEstado(id, body.estado);
            enviarJSON(res, 200, { mensaje: "Estado de receta actualizado" });
        } catch (e: any) {
            enviarError(res, 400, e.message);
        }
    }

}
