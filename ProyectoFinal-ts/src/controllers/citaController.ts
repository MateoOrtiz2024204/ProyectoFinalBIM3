import { IncomingMessage, ServerResponse } from "http";
import { CitaService } from "../services/citaService";
import { leerBody, enviarJSON, enviarError } from "../utils/http";

const service = new CitaService();

export class CitaController {

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
            enviarJSON(res, 201, { mensaje: "Cita agregada" });
        } catch (e: any) {
            enviarError(res, 400, e.message);
        }
    }

    async actualizar(req: IncomingMessage, res: ServerResponse, id: number) {
        try {
            const body = await leerBody(req);
            await service.actualizar(id, body);
            enviarJSON(res, 200, { mensaje: "Cita actualizada" });
        } catch (e: any) {
            enviarError(res, 400, e.message);
        }
    }

    async actualizarEstado(req: IncomingMessage, res: ServerResponse, id: number) {
        try {
            const body = await leerBody(req);
            await service.actualizarEstado(id, body.estado);
            enviarJSON(res, 200, { mensaje: "Estado de cita actualizado" });
        } catch (e: any) {
            enviarError(res, 400, e.message);
        }
    }

    async eliminar(_req: IncomingMessage, res: ServerResponse, id: number) {
        try {
            await service.eliminar(id);
            enviarJSON(res, 200, { mensaje: "Cita eliminada" });
        } catch (e: any) {
            enviarError(res, 400, e.message);
        }
    }

}
