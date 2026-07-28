import { HistorialClinicoRepository } from "../repositories/historialClinicoRepository";

export class HistorialClinicoService {

    private repo = new HistorialClinicoRepository();

    listar() {
        return this.repo.listar();
    }

    buscarPorPaciente(idPaciente: number) {
        return this.repo.buscarPorPaciente(idPaciente);
    }

    agregar(data: any) {
        if (!data.idPaciente || !data.diagnostico) {
            throw new Error("Faltan campos requeridos");
        }
        return this.repo.agregar({
            idPaciente: data.idPaciente,
            idMedico: data.idMedico ?? null,
            diagnostico: data.diagnostico,
            tratamiento: data.tratamiento ?? "",
            medicamentos: data.medicamentos ?? "",
            observaciones: data.observaciones ?? ""
        });
    }

}
