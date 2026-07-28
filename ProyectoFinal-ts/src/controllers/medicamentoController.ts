import { IncomingMessage, ServerResponse } from "http";
import { MedicamentoService } from "../services/medicamentoService";
import { leerBody, enviarJSON, enviarError } from "../utils/http";

const service = new MedicamentoService();

export class MedicamentoController {

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
            enviarJSON(res, 201, { mensaje: "Medicamento agregado" });
        } catch (e: any) {
            enviarError(res, 400, e.message);
        }
    }

    async actualizar(req: IncomingMessage, res: ServerResponse, id: number) {
        try {
            const body = await leerBody(req);
            await service.actualizar(id, body);
            enviarJSON(res, 200, { mensaje: "Medicamento actualizado" });
        } catch (e: any) {
            enviarError(res, 400, e.message);
        }
    }

    async eliminar(_req: IncomingMessage, res: ServerResponse, id: number) {
        try {
            await service.eliminar(id);
            enviarJSON(res, 200, { mensaje: "Medicamento eliminado" });
        } catch (e: any) {
            enviarError(res, 400, e.message);
        }
    }

}
