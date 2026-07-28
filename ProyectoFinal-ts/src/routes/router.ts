import { IncomingMessage, ServerResponse } from "http";
import { enviarError } from "../utils/http";

import { loginRoutes } from "./loginRoutes";
import { pacienteRoutes } from "./pacienteRoutes";
import { especialidadRoutes } from "./especialidadRoutes";
import { medicoRoutes } from "./medicoRoutes";
import { horarioRoutes } from "./horarioRoutes";
import { citaRoutes } from "./citaRoutes";
import { historialClinicoRoutes } from "./historialClinicoRoutes";
import { medicamentoRoutes } from "./medicamentoRoutes";
import { inventarioRoutes } from "./inventarioRoutes";
import { recetaRoutes } from "./recetaRoutes";

export async function router(req: IncomingMessage, res: ServerResponse) {
    const url = new URL(req.url ?? "/", `http://${req.headers.host}`);
    const partes = url.pathname.split("/").filter(Boolean);

    if (partes[0] !== "api") {
        enviarError(res, 404, "Ruta no encontrada");
        return;
    }

    const recurso = partes[1];
    const resto = partes.slice(2);

    switch (recurso) {
        case "login": return loginRoutes(req, res, resto);
        case "pacientes": return pacienteRoutes(req, res, resto);
        case "especialidades": return especialidadRoutes(req, res, resto);
        case "medicos": return medicoRoutes(req, res, resto);
        case "horarios": return horarioRoutes(req, res, resto);
        case "citas": return citaRoutes(req, res, resto);
        case "historiales": return historialClinicoRoutes(req, res, resto);
        case "medicamentos": return medicamentoRoutes(req, res, resto);
        case "inventario": return inventarioRoutes(req, res, resto);
        case "recetas": return recetaRoutes(req, res, resto);
        default: enviarError(res, 404, "Ruta no encontrada");
    }
}
