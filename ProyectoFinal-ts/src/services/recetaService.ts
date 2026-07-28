import { RecetaRepository } from "../repositories/recetaRepository";

export class RecetaService {

    private repo = new RecetaRepository();

    listar() {
        return this.repo.listar();
    }

    agregar(data: any) {
        if (!data.idHistorial || !data.idMedico || !data.idPaciente || !data.idInventario || !data.cantidad) {
            throw new Error("Faltan campos requeridos");
        }
        return this.repo.agregar({
            idHistorial: data.idHistorial,
            idMedico: data.idMedico,
            idPaciente: data.idPaciente,
            idInventario: data.idInventario,
            dosis: data.dosis ?? "",
            duracionDias: data.duracionDias ?? 0,
            cantidad: data.cantidad
        });
    }

    actualizarEstado(id: number, estado: string) {
        if (!estado) throw new Error("El estado es requerido");
        return this.repo.actualizarEstado(id, estado);
    }

}
