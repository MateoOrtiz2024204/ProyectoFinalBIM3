import { IncomingMessage, ServerResponse } from "http";
import { MedicoService } from "../services/medicoService";
import { leerBody, enviarJSON, enviarError } from "../utils/http";

const service = new MedicoService();

export class MedicoController {

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
            enviarJSON(res, 201, { mensaje: "Medico agregado" });
        } catch (e: any) {
            enviarError(res, 400, e.message);
        }
    }

    async actualizar(req: IncomingMessage, res: ServerResponse, id: number) {
        try {
            const body = await leerBody(req);
            await service.actualizar(id, body);
            enviarJSON(res, 200, { mensaje: "Medico actualizado" });
        } catch (e: any) {
            enviarError(res, 400, e.message);
        }
    }

    async eliminar(_req: IncomingMessage, res: ServerResponse, id: number) {
        try {
            await service.eliminar(id);
            enviarJSON(res, 200, { mensaje: "Medico eliminado" });
        } catch (e: any) {
            enviarError(res, 400, e.message);
        }
    }

}
