import { IncomingMessage, ServerResponse } from "http";
import { HistorialClinicoService } from "../services/historialClinicoService";
import { leerBody, enviarJSON, enviarError } from "../utils/http";

const service = new HistorialClinicoService();

export class HistorialClinicoController {

    async listar(_req: IncomingMessage, res: ServerResponse) {
        try {
            enviarJSON(res, 200, await service.listar());
        } catch (e: any) {
            enviarError(res, 500, e.message);
        }
    }

    async buscarPorPaciente(_req: IncomingMessage, res: ServerResponse, idPaciente: number) {
        try {
            enviarJSON(res, 200, await service.buscarPorPaciente(idPaciente));
        } catch (e: any) {
            enviarError(res, 400, e.message);
        }
    }

    async agregar(req: IncomingMessage, res: ServerResponse) {
        try {
            const body = await leerBody(req);
            await service.agregar(body);
            enviarJSON(res, 201, { mensaje: "Historial agregado" });
        } catch (e: any) {
            enviarError(res, 400, e.message);
        }
    }

}
