import { IncomingMessage, ServerResponse } from "http";
import { EspecialidadService } from "../services/especialidadService";
import { leerBody, enviarJSON, enviarError } from "../utils/http";

const service = new EspecialidadService();

export class EspecialidadController {

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
            enviarJSON(res, 201, { mensaje: "Especialidad agregada" });
        } catch (e: any) {
            enviarError(res, 400, e.message);
        }
    }

    async actualizar(req: IncomingMessage, res: ServerResponse, id: number) {
        try {
            const body = await leerBody(req);
            await service.actualizar(id, body);
            enviarJSON(res, 200, { mensaje: "Especialidad actualizada" });
        } catch (e: any) {
            enviarError(res, 400, e.message);
        }
    }

    async eliminar(_req: IncomingMessage, res: ServerResponse, id: number) {
        try {
            await service.eliminar(id);
            enviarJSON(res, 200, { mensaje: "Especialidad eliminada" });
        } catch (e: any) {
            enviarError(res, 400, e.message);
        }
    }

}
