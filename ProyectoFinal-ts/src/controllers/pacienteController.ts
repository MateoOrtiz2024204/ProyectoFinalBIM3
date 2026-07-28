import { IncomingMessage, ServerResponse } from "http";
import { PacienteService } from "../services/pacienteService";
import { leerBody, enviarJSON, enviarError } from "../utils/http";

const service = new PacienteService();

export class PacienteController {

    async listar(_req: IncomingMessage, res: ServerResponse) {
        try {
            const pacientes = await service.listar();
            enviarJSON(res, 200, pacientes);
        } catch (e: any) {
            enviarError(res, 500, e.message);
        }
    }

    async buscarPorId(_req: IncomingMessage, res: ServerResponse, id: number) {
        try {
            const paciente = await service.buscarPorId(id);
            enviarJSON(res, 200, paciente);
        } catch (e: any) {
            enviarError(res, 404, e.message);
        }
    }

    async agregar(req: IncomingMessage, res: ServerResponse) {
        try {
            const body = await leerBody(req);
            await service.agregar(body);
            enviarJSON(res, 201, { mensaje: "Paciente agregado" });
        } catch (e: any) {
            enviarError(res, 400, e.message);
        }
    }

    async actualizar(req: IncomingMessage, res: ServerResponse, id: number) {
        try {
            const body = await leerBody(req);
            await service.actualizar(id, body);
            enviarJSON(res, 200, { mensaje: "Paciente actualizado" });
        } catch (e: any) {
            enviarError(res, 400, e.message);
        }
    }

    async eliminar(_req: IncomingMessage, res: ServerResponse, id: number) {
        try {
            await service.eliminar(id);
            enviarJSON(res, 200, { mensaje: "Paciente eliminado" });
        } catch (e: any) {
            enviarError(res, 400, e.message);
        }
    }

}
